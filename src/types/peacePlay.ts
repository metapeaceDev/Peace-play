/**
 * Peace Play Streaming System Types
 * 
 * Types and interfaces for the Peace Play video streaming platform
 */

import { Timestamp } from 'firebase/firestore';

/**
 * Video format types supported by Peace Play
 */
export type VideoFormat = 'mp4' | 'webm' | 'mov';

/**
 * Video resolution options
 */
export type VideoResolution = '480p' | '720p' | '1080p' | '4K';

/**
 * Privacy settings for videos
 */
export type VideoPrivacy = 'public' | 'unlisted' | 'private';

/**
 * Video status for processing/publishing
 */
export type VideoStatus = 'processing' | 'ready' | 'failed';

/**
 * Main Peace Play Video document structure
 */
export interface PeacePlayVideo {
  // Identification
  videoId: string;                    // Unique video ID (document ID)
  userId: string;                     // Owner user ID
  
  // Metadata
  title: string;                      // Video title
  description: string;                // Video description
  thumbnailUrl: string;               // Thumbnail image URL (Firebase Storage)
  videoUrl: string;                   // Video file URL (Firebase Storage)
  
  // Technical details
  duration: number;                   // Duration in seconds
  format: VideoFormat;                // Video format (mp4, webm)
  resolution: VideoResolution;        // Video resolution
  fileSize: number;                   // File size in bytes
  
  // Organization
  projectId?: string;                 // Optional link to source project
  tags: string[];                     // Searchable tags
  category?: string;                  // Video category
  
  // Social metrics
  views: number;                      // View count
  likes: number;                      // Like count
  shares: number;                     // Share count
  
  // Settings
  privacy: VideoPrivacy;              // Privacy setting
  status: VideoStatus;                // Processing status
  allowComments: boolean;             // Enable/disable comments
  allowDownload: boolean;             // Enable/disable downloads
  
  // Timestamps
  createdAt: Timestamp;               // Created timestamp
  updatedAt: Timestamp;               // Last updated timestamp
  publishedAt?: Timestamp;            // Published timestamp (when made public)

  // Extended Metadata (Peace Script AI Integration)
  director?: string;
  writer?: string;
  stars?: string[];
  producer?: string;
  composer?: string;
  cinematographer?: string;
  editor?: string;
  artDirector?: string;
  costumeDesigner?: string;
  productionManager?: string;
  stunts?: string;
  lightingTechnician?: string;
  scriptSupervisor?: string;
  
  // Stats
  rating?: number;
  totalRatings?: number;
  totalLearners?: number;
  totalUnits?: number;

  // Rich Content
  storyScope?: string;
  screenplayPreview?: string;
  characters?: {
    name: string;
    role?: string;
    description?: string;
    img?: string;
  }[];
  gallery?: string[];
  
  cast?: {
    name: string;
    character: string;
    img?: string;
  }[];
  
  relatedScripts?: {
    id: number | string;
    title: string;
    description: string;
    url: string;
  }[];

  episodes?: { // videoContents
    id: number | string;
    title: string;
    duration: string;
  }[];
}

/**
 * Request type for creating a new Peace Play video
 */
export interface CreatePeacePlayVideoRequest {
  title: string;
  description?: string;
  videoBlob: Blob;                    // Video file as Blob
  thumbnailBlob?: Blob;               // Optional thumbnail
  projectId?: string;
  tags?: string[];
  category?: string;
  privacy?: VideoPrivacy;
  resolution?: VideoResolution;
  format?: VideoFormat;
  allowComments?: boolean;
  allowDownload?: boolean;
}

/**
 * Request type for registering an existing video (e.g. from Peace Script) to Peace Play
 */
export interface RegisterPeacePlayVideoRequest {
  title: string;
  description?: string;
  videoUrl: string;                   // Existing video URL (Firebase Storage)
  thumbnailUrl: string;               // Existing thumbnail URL
  duration?: number;
  format?: VideoFormat;
  resolution?: VideoResolution;
  fileSize?: number;
  projectId?: string;
  tags?: string[];
  category?: string;
  privacy?: VideoPrivacy;
  allowComments?: boolean;
  allowDownload?: boolean;
}

/**
 * Request type for updating Peace Play video metadata
 */
export interface UpdatePeacePlayVideoRequest {
  videoId: string;
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  privacy?: VideoPrivacy;
  thumbnailBlob?: Blob;               // New thumbnail
  allowComments?: boolean;
  allowDownload?: boolean;
}

/**
 * Query options for listing Peace Play videos
 */
export interface ListPeacePlayVideosOptions {
  userId?: string;                    // Filter by user
  privacy?: VideoPrivacy[];           // Filter by privacy
  tags?: string[];                    // Filter by tags
  category?: string;                  // Filter by category
  status?: VideoStatus[];             // Filter by status
  limit?: number;                     // Max results (default: 20)
  orderBy?: 'createdAt' | 'views' | 'likes' | 'updatedAt';
  orderDirection?: 'asc' | 'desc';
  startAfter?: string;                // For pagination (last videoId)
}

/**
 * Video analytics/stats
 */
export interface VideoAnalytics {
  videoId: string;
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  avgWatchTime: number;               // Average watch time in seconds
  completionRate: number;             // % of viewers who watched to end
  viewsByDate: { date: string; views: number }[];
  viewsByCountry: { country: string; views: number }[];
}

/**
 * Comment on a Peace Play video
 */
export interface VideoComment {
  commentId: string;
  videoId: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL?: string;
  content: string;
  parentCommentId?: string;           // For replies
  likes: number;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

/**
 * Video playlist
 */
export interface VideoPlaylist {
  playlistId: string;
  userId: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoIds: string[];                 // Ordered list of video IDs
  privacy: VideoPrivacy;
  totalViews: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
