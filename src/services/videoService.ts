import { 
    collection, 
    query, 
    where, 
    getDocs, 
    orderBy, 
    limit, 
    doc, 
    getDoc 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { PeacePlayVideo, ListPeacePlayVideosOptions } from '../types/peacePlay';

const COLLECTION_NAME = 'peace-play';

export const getPublicVideos = async (max: number = 20): Promise<PeacePlayVideo[]> => {
    try {
        // Simplified query to avoid "Index Required" errors
        // We will fetch by privacy='public' and sort client-side instead
        const q = query(
            collection(db, COLLECTION_NAME),
            where('privacy', '==', 'public'),
            limit(max)
        );
        
        const snapshot = await getDocs(q);
        
        const videos = snapshot.docs.map(doc => ({
            ...doc.data(),
            videoId: doc.id
        } as PeacePlayVideo));

        // Sort by createdAt descending (Newest first)
        return videos.sort((a, b) => {
            const timeA = a.createdAt && typeof a.createdAt.toMillis === 'function' ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt && typeof b.createdAt.toMillis === 'function' ? b.createdAt.toMillis() : 0;
            return timeB - timeA;
        });
    } catch (error) {
        console.error('Error fetching public videos:', error);
        return [];
    }
};

export const getVideoById = async (id: string): Promise<PeacePlayVideo | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            // Ensure videoId matches the document ID
            return {
                ...snapshot.data(),
                videoId: snapshot.id
            } as PeacePlayVideo;
        }
        return null;
    } catch (error) {
        console.error('Error fetching video:', error);
        return null;
    }
};