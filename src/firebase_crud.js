// firestore-crud.js
// Reusable CRUD operations for JavaScript Mastery Course Resources

import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

class FirestoreCRUD {
  constructor(db) {
    this.db = db;

    // Define collection names
    this.collections = {
      RECORDINGS: 'course_recordings',
      DOCUMENTATION: 'documentation_resources',
      VSCODE_EXTENSIONS: 'vscode_extensions',
      YOUTUBE_CHANNELS: 'youtube_channels',
      SOFTWARE_TOOLS: 'software_tools',
      PRACTICE_ACTIVITIES: 'practice_activities',
      GITHUB_REPOS: 'github_repositories',
    };
  }

  // ==================== CREATE OPERATIONS ====================

  /**
   * Add a new document to any collection
   * @param {string} collectionName - Name of the collection
   * @param {Object} data - Document data
   * @returns {Promise<string>} - Document ID
   */
  async create(collectionName, data) {
    try {
      const docData = {
        ...data,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        is_active: data.is_active !== undefined ? data.is_active : true,
      };

      const docRef = await addDoc(collection(this.db, collectionName), docData);
      console.log(`Document created in ${collectionName} with ID:`, docRef.id);
      return docRef.id;
    } catch (error) {
      console.error(`Error creating document in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Create a course recording
   * @param {Object} recordingData - Recording information
   */
  async createRecording(recordingData) {
    const data = {
      week: recordingData.week,
      month: recordingData.month,
      title: recordingData.title,
      description: recordingData.description,
      video_url: recordingData.video_url,
      duration: recordingData.duration,
      session_numbers: recordingData.session_numbers || [],
      topics: recordingData.topics || [],
      thumbnail_url: recordingData.thumbnail_url || '',
      file_size: recordingData.file_size || '',
      quality: recordingData.quality || 'HD',
    };

    return await this.create(this.collections.RECORDINGS, data);
  }

  /**
   * Create a documentation resource
   */
  async createDocumentation(docData) {
    const data = {
      title: docData.title,
      description: docData.description,
      url: docData.url,
      category: docData.category,
      difficulty_level: docData.difficulty_level || 'beginner',
      tags: docData.tags || [],
      icon: docData.icon || 'fas fa-book',
      is_official: docData.is_official || false,
    };

    return await this.create(this.collections.DOCUMENTATION, data);
  }

  /**
   * Create VS Code extension
   */
  async createVSCodeExtension(extensionData) {
    const data = {
      extension_name: extensionData.extension_name,
      publisher: extensionData.publisher,
      description: extensionData.description,
      install_url: extensionData.install_url,
      marketplace_url: extensionData.marketplace_url,
      category: extensionData.category,
      rating: extensionData.rating || 0,
      install_count: extensionData.install_count || '0',
      is_essential: extensionData.is_essential || false,
    };

    return await this.create(this.collections.VSCODE_EXTENSIONS, data);
  }

  /**
   * Create YouTube channel
   */
  async createYouTubeChannel(channelData) {
    const data = {
      channel_name: channelData.channel_name,
      channel_url: channelData.channel_url,
      description: channelData.description,
      category: channelData.category,
      subscriber_count: channelData.subscriber_count || '0',
      focus_area: channelData.focus_area || [],
      playlist_urls: channelData.playlist_urls || [],
      recommended_videos: channelData.recommended_videos || [],
    };

    return await this.create(this.collections.YOUTUBE_CHANNELS, data);
  }

  /**
   * Create software tool
   */
  async createSoftwareTool(toolData) {
    const data = {
      tool_name: toolData.tool_name,
      description: toolData.description,
      download_url: toolData.download_url,
      official_website: toolData.official_website || '',
      category: toolData.category,
      platform: toolData.platform || ['Windows', 'Mac', 'Linux'],
      is_free: toolData.is_free || true,
      version: toolData.version || 'Latest',
      file_size: toolData.file_size || '',
    };

    return await this.create(this.collections.SOFTWARE_TOOLS, data);
  }

  /**
   * Create practice activity
   */
  async createActivity(activityData) {
    const data = {
      activity_name: activityData.activity_name,
      description: activityData.description,
      difficulty: activityData.difficulty || 'beginner',
      url: activityData.url,
      skills_practiced: activityData.skills_practiced || [],
      estimated_time: activityData.estimated_time || '30 minutes',
      prerequisites: activityData.prerequisites || [],
      learning_outcomes: activityData.learning_outcomes || [],
    };

    return await this.create(this.collections.PRACTICE_ACTIVITIES, data);
  }

  /**
   * Create GitHub repository
   */
  async createGitHubRepo(repoData) {
    const data = {
      repo_name: repoData.repo_name,
      owner: repoData.owner,
      description: repoData.description,
      github_url: repoData.github_url,
      stars: repoData.stars || 0,
      category: repoData.category,
      language: repoData.language || 'JavaScript',
      topics: repoData.topics || [],
      is_template: repoData.is_template || false,
      license: repoData.license || 'MIT',
    };

    return await this.create(this.collections.GITHUB_REPOS, data);
  }

  // ==================== READ OPERATIONS ====================

  /**
   * Get a single document by ID
   * @param {string} collectionName - Collection name
   * @param {string} docId - Document ID
   * @returns {Promise<Object|null>} - Document data or null
   */
  async getById(collectionName, docId) {
    try {
      const docRef = doc(this.db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        console.log(`No document found with ID: ${docId} in ${collectionName}`);
        return null;
      }
    } catch (error) {
      console.error(
        `Error getting document ${docId} from ${collectionName}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Get all documents from a collection
   * @param {string} collectionName - Collection name
   * @param {Object} options - Query options
   * @returns {Promise<Array>} - Array of documents
   */
  async getAll(collectionName, options = {}) {
    try {
      const collectionRef = collection(this.db, collectionName);
      let q = collectionRef;

      // Apply filters
      if (options.where) {
        options.where.forEach((condition) => {
          q = query(
            q,
            where(condition.field, condition.operator, condition.value)
          );
        });
      }

      // Apply ordering
      if (options.orderBy) {
        q = query(
          q,
          orderBy(options.orderBy.field, options.orderBy.direction || 'asc')
        );
      }

      // Apply limit
      if (options.limit) {
        q = query(q, limit(options.limit));
      }

      const querySnapshot = await getDocs(q);
      const documents = [];

      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return documents;
    } catch (error) {
      console.error(`Error getting documents from ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Get recordings by month
   * @param {number} month - Month number (1-6)
   * @returns {Promise<Array>} - Array of recordings
   */
  async getRecordingsByMonth(month) {
    const options = {
      where: [
        { field: 'month', operator: '==', value: month },
        { field: 'is_active', operator: '==', value: true },
      ],
      orderBy: { field: 'week', direction: 'asc' },
    };

    return await this.getAll(this.collections.RECORDINGS, options);
  }

  /**
   * Get documentation by category
   * @param {string} category - Documentation category
   * @returns {Promise<Array>} - Array of documentation resources
   */
  async getDocumentationByCategory(category) {
    const options = {
      where: [
        { field: 'category', operator: '==', value: category },
        { field: 'is_active', operator: '==', value: true },
      ],
      orderBy: { field: 'title', direction: 'asc' },
    };

    return await this.getAll(this.collections.DOCUMENTATION, options);
  }

  /**
   * Get essential VS Code extensions
   * @returns {Promise<Array>} - Array of essential extensions
   */
  async getEssentialExtensions() {
    const options = {
      where: [
        { field: 'is_essential', operator: '==', value: true },
        { field: 'is_active', operator: '==', value: true },
      ],
      orderBy: { field: 'rating', direction: 'desc' },
    };

    return await this.getAll(this.collections.VSCODE_EXTENSIONS, options);
  }

  /**
   * Search resources across collections
   * @param {string} searchTerm - Search term
   * @param {string} collectionName - Specific collection or 'all'
   * @returns {Promise<Array>} - Search results
   */
  async search(searchTerm, collectionName = 'all') {
    try {
      const results = [];
      const searchLower = searchTerm.toLowerCase();

      const collectionsToSearch =
        collectionName === 'all'
          ? Object.values(this.collections)
          : [collectionName];

      for (const collection of collectionsToSearch) {
        const docs = await this.getAll(collection);
        const filtered = docs.filter(
          (doc) =>
            doc.title?.toLowerCase().includes(searchLower) ||
            doc.description?.toLowerCase().includes(searchLower) ||
            doc.tool_name?.toLowerCase().includes(searchLower) ||
            doc.extension_name?.toLowerCase().includes(searchLower) ||
            doc.channel_name?.toLowerCase().includes(searchLower) ||
            doc.repo_name?.toLowerCase().includes(searchLower) ||
            doc.activity_name?.toLowerCase().includes(searchLower) ||
            doc.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
        );

        filtered.forEach((doc) => {
          results.push({
            ...doc,
            collection: collection,
          });
        });
      }

      return results;
    } catch (error) {
      console.error('Error searching resources:', error);
      throw error;
    }
  }

  // ==================== UPDATE OPERATIONS ====================

  /**
   * Update a document
   * @param {string} collectionName - Collection name
   * @param {string} docId - Document ID
   * @param {Object} updates - Updates to apply
   * @returns {Promise<void>}
   */
  async update(collectionName, docId, updates) {
    try {
      const docRef = doc(this.db, collectionName, docId);
      const updateData = {
        ...updates,
        updated_at: serverTimestamp(),
      };

      await updateDoc(docRef, updateData);
      console.log(`Document ${docId} updated in ${collectionName}`);
    } catch (error) {
      console.error(
        `Error updating document ${docId} in ${collectionName}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Toggle active status
   * @param {string} collectionName - Collection name
   * @param {string} docId - Document ID
   * @returns {Promise<void>}
   */
  async toggleActive(collectionName, docId) {
    try {
      const currentDoc = await this.getById(collectionName, docId);
      if (currentDoc) {
        await this.update(collectionName, docId, {
          is_active: !currentDoc.is_active,
        });
      }
    } catch (error) {
      console.error(`Error toggling active status for ${docId}:`, error);
      throw error;
    }
  }

  // ==================== DELETE OPERATIONS ====================

  /**
   * Delete a document (hard delete)
   * @param {string} collectionName - Collection name
   * @param {string} docId - Document ID
   * @returns {Promise<void>}
   */
  async delete(collectionName, docId) {
    try {
      const docRef = doc(this.db, collectionName, docId);
      await deleteDoc(docRef);
      console.log(`Document ${docId} deleted from ${collectionName}`);
    } catch (error) {
      console.error(
        `Error deleting document ${docId} from ${collectionName}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Soft delete (set is_active to false)
   * @param {string} collectionName - Collection name
   * @param {string} docId - Document ID
   * @returns {Promise<void>}
   */
  async softDelete(collectionName, docId) {
    try {
      await this.update(collectionName, docId, {
        is_active: false,
        deleted_at: serverTimestamp(),
      });
      console.log(`Document ${docId} soft deleted from ${collectionName}`);
    } catch (error) {
      console.error(`Error soft deleting document ${docId}:`, error);
      throw error;
    }
  }

  // ==================== REAL-TIME LISTENERS ====================

  /**
   * Listen to collection changes in real-time
   * @param {string} collectionName - Collection name
   * @param {Function} callback - Callback function
   * @param {Object} options - Query options
   * @returns {Function} - Unsubscribe function
   */
  onCollectionChange(collectionName, callback, options = {}) {
    try {
      const collectionRef = collection(this.db, collectionName);
      let q = collectionRef;

      // Apply filters if provided
      if (options.where) {
        options.where.forEach((condition) => {
          q = query(
            q,
            where(condition.field, condition.operator, condition.value)
          );
        });
      }

      if (options.orderBy) {
        q = query(
          q,
          orderBy(options.orderBy.field, options.orderBy.direction || 'asc')
        );
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const documents = [];
        snapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        callback(documents);
      });

      return unsubscribe;
    } catch (error) {
      console.error(`Error setting up listener for ${collectionName}:`, error);
      throw error;
    }
  }

  // ==================== BATCH OPERATIONS ====================

  /**
   * Batch create multiple documents
   * @param {string} collectionName - Collection name
   * @param {Array} documents - Array of document data
   * @returns {Promise<Array>} - Array of created document IDs
   */
  async batchCreate(collectionName, documents) {
    try {
      const promises = documents.map((doc) => this.create(collectionName, doc));
      const results = await Promise.all(promises);
      console.log(
        `Batch created ${results.length} documents in ${collectionName}`
      );
      return results;
    } catch (error) {
      console.error(
        `Error batch creating documents in ${collectionName}:`,
        error
      );
      throw error;
    }
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Get collection statistics
   * @param {string} collectionName - Collection name
   * @returns {Promise<Object>} - Statistics object
   */
  async getCollectionStats(collectionName) {
    try {
      const allDocs = await this.getAll(collectionName);
      const activeDocs = allDocs.filter((doc) => doc.is_active !== false);

      return {
        total: allDocs.length,
        active: activeDocs.length,
        inactive: allDocs.length - activeDocs.length,
        collectionName,
      };
    } catch (error) {
      console.error(`Error getting stats for ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Get all collection statistics
   * @returns {Promise<Object>} - All collection statistics
   */
  async getAllStats() {
    try {
      const stats = {};

      for (const [key, collectionName] of Object.entries(this.collections)) {
        stats[key] = await this.getCollectionStats(collectionName);
      }

      return stats;
    } catch (error) {
      console.error('Error getting all collection stats:', error);
      throw error;
    }
  }
}

// Export the class and a factory function
export default FirestoreCRUD;

// Factory function for easy instantiation
export function createCRUDManager(firebaseDb) {
  return new FirestoreCRUD(firebaseDb);
}

// Usage example:
/*
// Initialize Firebase and get db instance first
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { createCRUDManager } from './firestore-crud.js';

const firebaseConfig = {
  // Your config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const crud = createCRUDManager(db);

// Usage examples:
// Create a recording
await crud.createRecording({
  week: 1,
  month: 1,
  title: "Git Fundamentals",
  description: "Introduction to Git and GitHub",
  video_url: "https://example.com/video1",
  duration: "2 hours"
});

// Get all recordings for month 1
const month1Recordings = await crud.getRecordingsByMonth(1);

// Search all resources
const searchResults = await crud.search("javascript");

// Update a document
await crud.update('course_recordings', 'docId', {
  title: "Updated Title"
});

// Set up real-time listener
const unsubscribe = crud.onCollectionChange('course_recordings', (recordings) => {
  console.log('Recordings updated:', recordings);
});
*/
