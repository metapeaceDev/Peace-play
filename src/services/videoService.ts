import { 
    collection, 
    query, 
    where, 
    getDocs, 
    limit, 
    doc, 
    getDoc 
} from 'firebase/firestore';
import { db, legacyDb } from '../config/firebase';
import type { PeacePlayVideo, ListPeacePlayVideosOptions } from '../types/peacePlay';

const COLLECTION_NAME = 'peace-play';
const LEGACY_PROJECT_ID = process.env.NEXT_PUBLIC_LEGACY_FIREBASE_PROJECT_ID || 'peace-script-ai';
const LEGACY_API_KEY = process.env.NEXT_PUBLIC_LEGACY_FIREBASE_API_KEY || 'AIzaSyCMZn8sVtszG_gl1NHjbViAnPy6JVeCHvo';
const SOURCE_TIMEOUT_MS = 2500;
const SOURCE_TIMEOUT_DEEP_MS = 7000;
const PUBLIC_VIDEO_CACHE_TTL_MS = 60_000;
const PUBLIC_VIDEO_CACHE_KEY = 'peace-play-public-videos-cache-v1';

let inMemoryPublicVideosCache: {
    max: number;
    fetchedAt: number;
    videos: PeacePlayVideo[];
} | null = null;

const normalizeNumber = (value: unknown, fallback: number = 0) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
    }
    return fallback;
};

const normalizeString = (value: unknown, fallback: string = '') => {
    if (typeof value === 'string') return value;
    if (value === null || value === undefined) return fallback;
    return String(value);
};

const normalizeStringArray = (value: unknown) => {
    if (!Array.isArray(value)) return [] as string[];
    return value.map(item => normalizeString(item)).filter(Boolean);
};

const defaultTimestamp = {
    toMillis: () => 0,
    toDate: () => new Date(0),
    seconds: 0,
};

const normalizeTimestamp = (value: unknown) => {
    if (value && typeof value === 'object') {
        const candidate = value as Record<string, unknown>;
        if (typeof candidate.toMillis === 'function') return value;
        if (typeof candidate.seconds === 'number') {
            const millis = candidate.seconds * 1000;
            return {
                toMillis: () => millis,
                toDate: () => new Date(millis),
                seconds: candidate.seconds,
            };
        }
    }

    if (typeof value === 'string') {
        const millis = Date.parse(value);
        if (!Number.isNaN(millis)) {
            return {
                toMillis: () => millis,
                toDate: () => new Date(millis),
                seconds: Math.floor(millis / 1000),
            };
        }
    }

    return defaultTimestamp;
};

const normalizeVideo = (video: Record<string, unknown>): PeacePlayVideo => {
    const createdAt = normalizeTimestamp(video.createdAt || video.publishedAt || video.updatedAt);
    const updatedAt = normalizeTimestamp(video.updatedAt || video.createdAt || video.publishedAt);

    return {
        videoId: normalizeString(video.videoId),
        userId: normalizeString(video.userId, 'unknown'),
        title: normalizeString(video.title, 'Untitled'),
        description: normalizeString(video.description, ''),
        thumbnailUrl: normalizeString(video.thumbnailUrl, ''),
        videoUrl: normalizeString(video.videoUrl, ''),
        duration: normalizeNumber(video.duration, 0),
        format: (normalizeString(video.format, 'mp4') as any),
        resolution: (normalizeString(video.resolution, '720p') as any),
        fileSize: normalizeNumber(video.fileSize, 0),
        projectId: video.projectId ? normalizeString(video.projectId) : undefined,
        tags: normalizeStringArray(video.tags),
        category: video.category ? normalizeString(video.category) : undefined,
        views: normalizeNumber(video.views, 0),
        likes: normalizeNumber(video.likes, 0),
        shares: normalizeNumber(video.shares, 0),
        privacy: (normalizeString(video.privacy, 'public') as any),
        status: (normalizeString(video.status, 'ready') as any),
        allowComments: Boolean(video.allowComments ?? true),
        allowDownload: Boolean(video.allowDownload ?? false),
        createdAt: createdAt as any,
        updatedAt: updatedAt as any,
        publishedAt: video.publishedAt ? (normalizeTimestamp(video.publishedAt) as any) : undefined,
        // Extended metadata
        director: video.director ? normalizeString(video.director) : undefined,
        writer: video.writer ? normalizeString(video.writer) : undefined,
        stars: normalizeStringArray(video.stars),
        producer: video.producer ? normalizeString(video.producer) : undefined,
        composer: video.composer ? normalizeString(video.composer) : undefined,
        cinematographer: video.cinematographer ? normalizeString(video.cinematographer) : undefined,
        editor: video.editor ? normalizeString(video.editor) : undefined,
        artDirector: video.artDirector ? normalizeString(video.artDirector) : undefined,
        costumeDesigner: video.costumeDesigner ? normalizeString(video.costumeDesigner) : undefined,
        productionManager: video.productionManager ? normalizeString(video.productionManager) : undefined,
        stunts: video.stunts ? normalizeString(video.stunts) : undefined,
        lightingTechnician: video.lightingTechnician ? normalizeString(video.lightingTechnician) : undefined,
        scriptSupervisor: video.scriptSupervisor ? normalizeString(video.scriptSupervisor) : undefined,
        rating: video.rating ? normalizeNumber(video.rating) : undefined,
        totalRatings: video.totalRatings ? normalizeNumber(video.totalRatings) : undefined,
        totalLearners: video.totalLearners ? normalizeNumber(video.totalLearners) : undefined,
        totalUnits: video.totalUnits ? normalizeNumber(video.totalUnits) : undefined,
        
        storyScope: normalizeString(video.storyScope, ''),
        screenplayPreview: normalizeString(video.screenplayPreview, ''),
        characters: Array.isArray(video.characters) ? video.characters : [],
        gallery: normalizeStringArray(video.gallery),

        cast: Array.isArray(video.cast) ? video.cast : [],
        relatedScripts: Array.isArray(video.relatedScripts) ? video.relatedScripts : [],
        episodes: Array.isArray(video.episodes) ? video.episodes : [],
    };
};

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number, sourceName: string): Promise<T> => {
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

    const timeoutPromise = new Promise<T>((_, reject) => {
        timeoutHandle = setTimeout(() => {
            reject(new Error(`${sourceName} timed out after ${timeoutMs}ms`));
        }, timeoutMs);
    });

    try {
        return await Promise.race([promise, timeoutPromise]);
    } finally {
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
        }
    }
};

const mapVideoSnapshot = (snapshot: Awaited<ReturnType<typeof getDocs>>): PeacePlayVideo[] => {
    return snapshot.docs.map(document => {
        const payload = document.data() as Record<string, unknown>;
        return normalizeVideo({
            ...payload,
            videoId: document.id
        });
    });
};

const toTimestampLike = (value: unknown): unknown => {
    if (typeof value === 'string') {
        const millis = Date.parse(value);
        if (!Number.isNaN(millis)) {
            return {
                toMillis: () => millis,
                toDate: () => new Date(millis),
                seconds: Math.floor(millis / 1000),
            };
        }
    }

    if (Array.isArray(value)) {
        return value.map(toTimestampLike);
    }

    if (value && typeof value === 'object') {
        const entries = Object.entries(value as Record<string, unknown>).map(([key, nested]) => [key, toTimestampLike(nested)]);
        return Object.fromEntries(entries);
    }

    return value;
};

const sortByCreatedAtDesc = (videos: PeacePlayVideo[]) => {
    return videos.sort((a, b) => {
        const timeA = a.createdAt && typeof a.createdAt.toMillis === 'function' ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt && typeof b.createdAt.toMillis === 'function' ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
    });
};

const getPublicVideosFromDatabase = async (database: typeof db, max: number) => {
    const q = query(
        collection(database, COLLECTION_NAME),
        where('privacy', '==', 'public'),
        limit(max)
    );

    const snapshot = await getDocs(q);
    return mapVideoSnapshot(snapshot);
};

const safeGetPublicVideosFromDatabase = async (database: typeof db, max: number, timeoutMs: number = SOURCE_TIMEOUT_MS) => {
    try {
        return await withTimeout(getPublicVideosFromDatabase(database, max), timeoutMs, 'Firestore SDK query');
    } catch (error) {
        // Source-level failures are expected in fallback mode; keep console clean.
        return [] as PeacePlayVideo[];
    }
};

const parseFirestoreRestValue = (value: any): any => {
    if (!value || typeof value !== 'object') return undefined;
    if ('stringValue' in value) return value.stringValue;
    if ('integerValue' in value) return Number(value.integerValue);
    if ('doubleValue' in value) return Number(value.doubleValue);
    if ('booleanValue' in value) return Boolean(value.booleanValue);
    if ('timestampValue' in value) return value.timestampValue;
    if ('arrayValue' in value) return (value.arrayValue?.values || []).map(parseFirestoreRestValue);
    if ('mapValue' in value) {
        const fields = value.mapValue?.fields || {};
        return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, parseFirestoreRestValue(v)]));
    }
    return undefined;
};

const mapFirestoreRestDocToVideo = (document: any): PeacePlayVideo | null => {
    const name: string = document?.name || '';
    const id = name.split('/').pop();
    const fields = document?.fields || {};
    if (!id) return null;

    const payload = Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [key, parseFirestoreRestValue(value)])
    ) as Record<string, unknown>;

    const normalizedPayload = toTimestampLike(payload) as Record<string, unknown>;

    return {
        ...normalizeVideo(normalizedPayload),
        videoId: id,
    } as PeacePlayVideo;
};

const fetchPublicVideosViaRest = async (max: number, timeoutMs: number = SOURCE_TIMEOUT_MS): Promise<PeacePlayVideo[]> => {
    const endpoint = `https://firestore.googleapis.com/v1/projects/${LEGACY_PROJECT_ID}/databases/(default)/documents:runQuery?key=${LEGACY_API_KEY}`;
    const body = {
        structuredQuery: {
            from: [{ collectionId: COLLECTION_NAME }],
            where: {
                fieldFilter: {
                    field: { fieldPath: 'privacy' },
                    op: 'EQUAL',
                    value: { stringValue: 'public' },
                },
            },
            limit: max,
        },
    };

    const response = await withTimeout(fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    }), timeoutMs, 'Legacy REST query');

    if (!response.ok) {
        throw new Error(`Legacy REST fallback failed: ${response.status}`);
    }

    const rows = (await response.json()) as Array<{ document?: any }>;
    return rows
        .map(row => mapFirestoreRestDocToVideo(row.document))
        .filter((video): video is PeacePlayVideo => Boolean(video));
};

const fetchPublicVideosViaRestList = async (max: number, timeoutMs: number = SOURCE_TIMEOUT_MS): Promise<PeacePlayVideo[]> => {
    const endpoint = `https://firestore.googleapis.com/v1/projects/${LEGACY_PROJECT_ID}/databases/(default)/documents/${COLLECTION_NAME}?pageSize=${Math.max(max * 2, 20)}&key=${LEGACY_API_KEY}`;
    const response = await withTimeout(fetch(endpoint), timeoutMs, 'Legacy REST list query');
    if (!response.ok) {
        throw new Error(`Legacy REST list fallback failed: ${response.status}`);
    }

    const payload = await response.json() as { documents?: any[] };
    const videos = (payload.documents || [])
        .map(document => mapFirestoreRestDocToVideo(document))
        .filter((video): video is PeacePlayVideo => Boolean(video))
        .filter(video => video.privacy === 'public');

    return videos.slice(0, max);
};

const fetchVideoByIdViaRest = async (id: string): Promise<PeacePlayVideo | null> => {
    const endpoint = `https://firestore.googleapis.com/v1/projects/${LEGACY_PROJECT_ID}/databases/(default)/documents/${COLLECTION_NAME}/${id}?key=${LEGACY_API_KEY}`;
    const response = await withTimeout(fetch(endpoint), SOURCE_TIMEOUT_MS, 'Legacy REST document query');
    if (!response.ok) return null;
    const document = await response.json();
    return mapFirestoreRestDocToVideo(document);
};

// Maps a raw Firestore REST Project document to the PeacePlayVideo enrichment structure
// Fallback: If REST also fails (CORS/403), use a hardcoded lookup map for known demo IDs
// This is a temporary fix until backend API permissions are resolved.
const getHardcodedEnrichment = (id: string): Partial<PeacePlayVideo> | null => {
    if (id === 'XZXPKMlOBOImVWl2oxTp') {
        return {
            storyScope: "ACT 1 (Setup): พิม ศิลปินกราฟิกผู้เก็บตัว ใช้ชีวิตอยู่กับงานศิลปะและความคิดฟุ้งซ่าน เธอมีนิสัยชอบเก็บกดความรู้สึกและสร้างกำแพงกั้นตัวเองจากโลกภายนอก วันหนึ่งหลังจากเหตุการณ์ผิดหวังครั้งใหญ่ จิตใต้สำนึกของเธอเริ่มทำงานแปลกๆ สิ่งของรอบตัวเริ่มมีชีวิต ความฝันปะปนกับความจริง และเธอก็เริ่มเห็น 'เพื่อนในจินตนาการ' ที่เธอเคยสร้างขึ้นในวัยเด็กกลับมามีตัวตนจริงอีกครั้ง แต่คราวนี้มันดูน่าขนลุกและเต็มไปด้วยความลับ ACT 2 (Confrontation): จิตปรุงแต่งของพิมทวีความรุนแรงขึ้น สิ่งประหลาดน่ากลัวเริ่มปรากฏตัวออกมาจากมุมมืดในบ้านของเธอ ทั้งสิ่งมีชีวิตตลกขบขันที่แฝงความน่ากลัว และสัตว์ประหลาดจากฝันร้ายในวัยเด็กที่กลับมาหลอกหลอน พิมพยายามหลบหนีและปฏิเสธว่านี่ไม่ใช่เรื่องจริง แต่โลกภายนอกของเธอก็เริ่มได้รับผลกระทบ ผู้คนรอบข้างมองว่าเธอเสียสติ จุดหักเหสำคัญคือการที่เธอได้พบกับ 'จิตปรุงแต่ง' ขนาดใหญ่ที่สุด ซึ่งเป็นภาพสะท้อนของความกลัวและความโดดเดี่ยวที่ลึกที่สุดในใจ เธอถูกผลักดันเข้าสู่ความสิ้นหวัง แต่ก็เริ่มตระหนักว่าหนทางเดียวที่จะหยุดยั้งมันคือการเผชิญหน้ากับความจริงในใจตัวเอง ACT 3 (Resolution): พิมตัดสินใจที่จะหยุดหนีและเผชิญหน้ากับ 'จิตปรุงแต่ง' ที่น่าสะพรึงกลัวทั้งหมด เธอเริ่มสำรวจความทรงจำที่ถูกลืม ความเจ็บปวดที่ถูกเก็บงำ และความปรารถนาที่ถูกปฏิเสธ ในการเผชิญหน้าครั้งสุดท้าย เธอต้องเลือกที่จะยอมรับทุกส่วนของตัวตน ไม่ว่าจะดีหรือร้าย การตัดสินใจยอมรับความจริงทำให้ 'จิตปรุงแต่ง' ค่อยๆ สลายไป โลกของพิมกลับมาสู่ความเป็นจริงอีกครั้ง เธอไม่ได้หายจากโรคนี้โดยสมบูรณ์ แต่เธอได้เรียนรู้ที่จะอยู่กับมันอย่างเข้าใจ และยอมรับว่าจิตใจคือทั้งผู้สร้างและผู้ทำลาย และเธอมีพลังที่จะควบคุมมันได้ สิ่งที่ยังคงอยู่คือบทเรียนของการยอมรับตนเอง",
            characters: [
                { name: "Pim", role: "Protagonist", description: "Graphic artist struggling with inner demons.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" },
                { name: "The Shadow", role: "Antagonist", description: "Manifestation of Pim's fears.", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" }
            ],
            screenplayPreview: "INT. PIM'S APARTMENT - NIGHT\n\nThe room is dark, illuminated only by the glow of a computer screen. PIM (20s) sits hunched over her tablet, drawing frantically.\n\nSuddenly, a SHADOW moves in the corner of her eye.\n\nPIM\nWho's there?\n\nNo answer. Just the humming of the refrigerator.",
            gallery: [
                "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", 
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
            ]
        };
    }
    return null;
};

const mapFirestoreRestProjectToEnrichment = (document: any): Partial<PeacePlayVideo> | null => {
    const fields = document?.fields || {};
    // Parse the entire object first
    const data = Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [key, parseFirestoreRestValue(value)])
    ) as Record<string, any>;
    
    if (!data) return null;

    return {
         storyScope: normalizeString(data.storyScope || data.story?.scope || data.scope || data.synopsis),
         characters: data.characters || data.step3?.characters || data.step3 || [],
         screenplayPreview: normalizeString(data.screenplayPreview || data.screenplay || ''),
         gallery: normalizeStringArray(data.gallery || data.images || data.storyboard),
         // Extended metadata fallback
         cast: Array.isArray(data.characters) ? data.characters : []
    };
};

const fetchProjectByIdViaRest = async (id: string): Promise<Partial<PeacePlayVideo> | null> => {
    // 1. Try hardcoded enrichment first (TEMPORARY FIX for 403 Forbidden on Legacy Project)
    const hardcoded = getHardcodedEnrichment(id);
    if (hardcoded) {
        // console.log('Using hardcoded enrichment for:', id);
        return hardcoded;
    }

    // 2. Try 'projects' collection via REST
    const endpoint = `https://firestore.googleapis.com/v1/projects/${LEGACY_PROJECT_ID}/databases/(default)/documents/projects/${id}?key=${LEGACY_API_KEY}`;
    try {
        const response = await withTimeout(fetch(endpoint), SOURCE_TIMEOUT_MS, 'Legacy REST project query');
        if (!response.ok) {
             // console.warn('REST Project fetch failed:', response.status); 
             return null;
        }
        const document = await response.json();
        return mapFirestoreRestProjectToEnrichment(document);
    } catch (e) {
        console.warn('REST Project fetch error:', e);
        return null;
    }
};

const readPublicVideosFromStorageCache = (max: number): PeacePlayVideo[] | null => {
    if (typeof window === 'undefined') return null;
    try {
        const raw = window.localStorage.getItem(PUBLIC_VIDEO_CACHE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as {
            fetchedAt?: number;
            videos?: PeacePlayVideo[];
        };

        if (!parsed?.fetchedAt || !Array.isArray(parsed.videos)) return null;
        if (Date.now() - parsed.fetchedAt > PUBLIC_VIDEO_CACHE_TTL_MS) return null;

        return parsed.videos.slice(0, max);
    } catch {
        return null;
    }
};

const writePublicVideosToStorageCache = (videos: PeacePlayVideo[]) => {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(
            PUBLIC_VIDEO_CACHE_KEY,
            JSON.stringify({
                fetchedAt: Date.now(),
                videos,
            })
        );
    } catch {
        // ignore cache write issues
    }
};

const getPublicVideosFromFastSources = async (max: number): Promise<PeacePlayVideo[]> => {
    const sources: Array<() => Promise<PeacePlayVideo[]>> = [
        () => fetchPublicVideosViaRestList(max),
        () => fetchPublicVideosViaRest(max),
        () => safeGetPublicVideosFromDatabase(legacyDb, max),
        () => safeGetPublicVideosFromDatabase(db, max),
    ];

    const candidates = sources.map(source =>
        (async () => {
            const videos = await source();
            if (!videos.length) {
                throw new Error('empty-source');
            }
            return videos;
        })()
    );

    try {
        return await withTimeout(Promise.any(candidates), SOURCE_TIMEOUT_MS + 800, 'Parallel video sources');
    } catch {
        return [];
    }
};

const getPublicVideosFromDeepSources = async (max: number): Promise<PeacePlayVideo[]> => {
    const sources: Array<() => Promise<PeacePlayVideo[]>> = [
        () => fetchPublicVideosViaRestList(max, SOURCE_TIMEOUT_DEEP_MS),
        () => fetchPublicVideosViaRest(max, SOURCE_TIMEOUT_DEEP_MS),
        () => safeGetPublicVideosFromDatabase(legacyDb, max, SOURCE_TIMEOUT_DEEP_MS),
        () => safeGetPublicVideosFromDatabase(db, max, SOURCE_TIMEOUT_DEEP_MS),
    ];

    for (const source of sources) {
        const videos = await source();
        if (videos.length > 0) {
            return videos;
        }
    }

    return [];
};

export const getPublicVideos = async (max: number = 20): Promise<PeacePlayVideo[]> => {
    try {
        if (
            inMemoryPublicVideosCache
            && inMemoryPublicVideosCache.max >= max
            && Date.now() - inMemoryPublicVideosCache.fetchedAt <= PUBLIC_VIDEO_CACHE_TTL_MS
        ) {
            return sortByCreatedAtDesc([...inMemoryPublicVideosCache.videos].map(video => normalizeVideo(video as unknown as Record<string, unknown>))).slice(0, max);
        }

        const storageCached = readPublicVideosFromStorageCache(max);
        if (storageCached && storageCached.length > 0) {
            inMemoryPublicVideosCache = {
                max,
                fetchedAt: Date.now(),
                videos: storageCached.map(video => normalizeVideo(video as unknown as Record<string, unknown>)),
            };
            return sortByCreatedAtDesc(storageCached.map(video => normalizeVideo(video as unknown as Record<string, unknown>)));
        }

        let videos = await getPublicVideosFromFastSources(max);

        if (videos.length === 0) {
            videos = await getPublicVideosFromDeepSources(max);
        }

        const sorted = sortByCreatedAtDesc(videos.map(video => normalizeVideo(video as unknown as Record<string, unknown>)));

        if (sorted.length > 0) {
            inMemoryPublicVideosCache = {
                max,
                fetchedAt: Date.now(),
                videos: sorted,
            };
            writePublicVideosToStorageCache(sorted);
        }

        return sorted;
    } catch (error) {
        console.error('Error fetching public videos:', error);
        return [];
    }
};

export const getVideoById = async (id: string): Promise<PeacePlayVideo | null> => {
    try {
        let videoData: PeacePlayVideo | null = null;

        // 1. Try 'peace-play' collection in Main DB
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                videoData = normalizeVideo({
                    ...snapshot.data(),
                    videoId: snapshot.id
                });
            }
        } catch (error) {
            console.warn('Primary video lookup failed, trying legacy source:', error);
        }

        // 2. Try 'peace-play' collection in Legacy DB (if not found in Main)
        if (!videoData) {
            try {
                const legacyDocRef = doc(legacyDb, COLLECTION_NAME, id);
                const legacySnapshot = await getDoc(legacyDocRef);
                if (legacySnapshot.exists()) {
                    videoData = normalizeVideo({
                        ...legacySnapshot.data(),
                        videoId: legacySnapshot.id
                    });
                }
            } catch (e) { 
                // console.warn("Legacy peace-play lookup failed", e); 
            }
        }

        // 3. Enrich with 'projects' collection data (The "Peace Script AI" source)
        // We do this if we found a video record but it's missing rich data, 
        // OR if found no video record at all (fallback logic).
        try {
            // Priority: Try REST first because SDK often fails with Permission Denied on cross-project 'projects' collection
            // unless the user is specifically auth'd to that project.
            // REST uses API Key which might have broader public read scope.
            let richData: Partial<PeacePlayVideo> | null = null;
            
            // Try SDK first (cheap if works)
            try {
                const projectDocRef = doc(legacyDb, 'projects', id);
                const projectSnapshot = await getDoc(projectDocRef);
                if (projectSnapshot.exists()) {
                    const pData = projectSnapshot.data();
                    richData = {
                        storyScope: pData.storyScope || pData.story?.scope || pData.scope || pData.synopsis,
                        characters: pData.characters || pData.step3?.characters || pData.step3 || [],
                        screenplayPreview: pData.screenplayPreview || pData.screenplay || '',
                        gallery: pData.gallery || pData.images || pData.storyboard || [],
                        cast: pData.cast || (Array.isArray(pData.characters) ? pData.characters : [])
                    };
                }
            } catch (sdkErr) {
                 // SDK failed (likely permission), try REST
                 // console.log("Switching to REST for enrichment due to:", sdkErr);
                 richData = await fetchProjectByIdViaRest(id);
            }

            if (richData) {
                 if (videoData) {
                     // Merge rich data into existing video record if fields are missing
                     videoData = {
                         ...videoData,
                         storyScope: videoData.storyScope || richData.storyScope,
                         characters: (videoData.characters && videoData.characters.length > 0) ? videoData.characters : richData.characters,
                         screenplayPreview: videoData.screenplayPreview || richData.screenplayPreview,
                         gallery: (videoData.gallery && videoData.gallery.length > 0) ? videoData.gallery : richData.gallery,
                         // Ensure extended metadata is normalized again if needed, or trust the merge
                         cast: (videoData.cast && videoData.cast.length > 0) ? videoData.cast : (Array.isArray(richData.characters) ? (richData.characters as any) : [])
                     };
                 } else {
                     // If no video record found yet, create one from the project record (if rich data implies existence)
                     // Note: We need minimal fields like title/videoId. REST enrichment returns partial.
                     // But if we only have richData, we lack critical info like 'title' unless we mapped it.
                     // `fetchProjectByIdViaRest` maps enrichment fields. Let's rely on `videoData` being found 
                     // OR if not found, we might want to fetch FULL project via REST and map it to a Video?
                     // For now, assume videoData exists (from peace-play) or we don't show it.
                     // BUT: The previous logic allowed creating from Project snapshot data.
                     // We should support that if `videoData` is null.
                     // Since `fetchProjectByIdViaRest` only returns Partial, we can't fully construct a video from it easily 
                     // unless we map MORE fields in `mapFirestoreRestProjectToEnrichment`.
                     // Let's assume enrichment is the primary goal.
                     // If videoData is null, we can't do much with just enrichment data.
                 }
            }
        } catch (err) {
            console.warn('Project lookup failed:', err);
        }

        if (videoData) {
            return videoData;
        }

        // 4. Last resort: REST API
        const legacyRestVideo = await fetchVideoByIdViaRest(id);
        if (legacyRestVideo) {
            return legacyRestVideo; 
        }

        return null;
    } catch (error) {
        console.error('Error fetching video:', error);
        return null;
    }
};