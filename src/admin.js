// Import Firebase modules and CRUD functions
import { db } from './firebase_config.js';
import { createCRUDManager } from './firebase_crud.js';

// Initialize CRUD manager
const crud = createCRUDManager(db);

// Make crud available globally for debugging
window.crud = crud;

// ==================== DATA FETCHING FUNCTIONS ====================

/**
 * Load and display recordings data
 */
async function loadRecordingsData() {
  try {
    const recordingsTableBody = document.querySelector(
      '#recordings-table-body'
    );
    if (!recordingsTableBody) return;

    // Show loading state
    recordingsTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center">
          <div class="flex items-center justify-center space-x-2">
            <i class="fas fa-spinner fa-spin text-blue-600"></i>
            <span class="text-gray-600">Loading recordings...</span>
          </div>
        </td>
      </tr>
    `;

    // Fetch recordings data
    const recordings = await crud.getAll(crud.collections.RECORDINGS, {
      orderBy: { field: 'week', direction: 'asc' },
    });

    // Clear loading state
    recordingsTableBody.innerHTML = '';

    if (recordings.length === 0) {
      recordingsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-gray-500">
            <i class="fas fa-video-slash text-3xl mb-2"></i>
            <p>No recordings found. Add your first recording!</p>
          </td>
        </tr>
      `;
      return;
    }

    // Populate table with real data
    recordings.forEach((recording) => {
      const row = createRecordingTableRow(recording);
      recordingsTableBody.appendChild(row);
    });

    updatePaginationInfo('recordings', recordings.length);
  } catch (error) {
    console.error('Error loading recordings:', error);
    showErrorState('recordings-table-body', 'Failed to load recordings');
  }
}

/**
 * Load and display documentation data
 */
async function loadDocumentationData() {
  try {
    const docsTableBody = document.querySelector('#documentation-table-body');
    if (!docsTableBody) return;

    docsTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center">
          <div class="flex items-center justify-center space-x-2">
            <i class="fas fa-spinner fa-spin text-blue-600"></i>
            <span class="text-gray-600">Loading documentation...</span>
          </div>
        </td>
      </tr>
    `;

    const documentation = await crud.getAll(crud.collections.DOCUMENTATION, {
      orderBy: { field: 'title', direction: 'asc' },
    });

    docsTableBody.innerHTML = '';

    if (documentation.length === 0) {
      docsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-gray-500">
            <i class="fas fa-book-open text-3xl mb-2"></i>
            <p>No documentation found. Add your first resource!</p>
          </td>
        </tr>
      `;
      return;
    }

    documentation.forEach((doc) => {
      const row = createDocumentationTableRow(doc);
      docsTableBody.appendChild(row);
    });

    updatePaginationInfo('documentation', documentation.length);
  } catch (error) {
    console.error('Error loading documentation:', error);
    showErrorState('documentation-table-body', 'Failed to load documentation');
  }
}

/**
 * Load and display VS Code extensions data
 */
async function loadExtensionsData() {
  try {
    const extensionsTableBody = document.querySelector(
      '#extensions-table-body'
    );
    if (!extensionsTableBody) return;

    extensionsTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center">
          <div class="flex items-center justify-center space-x-2">
            <i class="fas fa-spinner fa-spin text-blue-600"></i>
            <span class="text-gray-600">Loading extensions...</span>
          </div>
        </td>
      </tr>
    `;

    const extensions = await crud.getAll(crud.collections.VSCODE_EXTENSIONS, {
      orderBy: { field: 'rating', direction: 'desc' },
    });

    extensionsTableBody.innerHTML = '';

    if (extensions.length === 0) {
      extensionsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-gray-500">
            <i class="fas fa-puzzle-piece text-3xl mb-2"></i>
            <p>No extensions found. Add your first extension!</p>
          </td>
        </tr>
      `;
      return;
    }

    extensions.forEach((extension) => {
      const row = createExtensionTableRow(extension);
      extensionsTableBody.appendChild(row);
    });

    updatePaginationInfo('extensions', extensions.length);
  } catch (error) {
    console.error('Error loading extensions:', error);
    showErrorState('extensions-table-body', 'Failed to load extensions');
  }
}

/**
 * Load and display YouTube channels data
 */
async function loadYouTubeChannelsData() {
  try {
    const channelsTableBody = document.querySelector('#youtube-table-body');
    if (!channelsTableBody) return;

    channelsTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center">
          <div class="flex items-center justify-center space-x-2">
            <i class="fab fa-youtube fa-spin text-red-600"></i>
            <span class="text-gray-600">Loading channels...</span>
          </div>
        </td>
      </tr>
    `;

    const channels = await crud.getAll(crud.collections.YOUTUBE_CHANNELS, {
      orderBy: { field: 'subscriber_count', direction: 'desc' },
    });

    channelsTableBody.innerHTML = '';

    if (channels.length === 0) {
      channelsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-gray-500">
            <i class="fab fa-youtube text-3xl mb-2"></i>
            <p>No YouTube channels found. Add your first channel!</p>
          </td>
        </tr>
      `;
      return;
    }

    channels.forEach((channel) => {
      const row = createYouTubeChannelTableRow(channel);
      channelsTableBody.appendChild(row);
    });

    updatePaginationInfo('youtube', channels.length);
  } catch (error) {
    console.error('Error loading YouTube channels:', error);
    showErrorState('youtube-table-body', 'Failed to load channels');
  }
}

/**
 * Load and display software tools data
 */
async function loadSoftwareToolsData() {
  try {
    const toolsTableBody = document.querySelector('#software-table-body');
    if (!toolsTableBody) return;

    toolsTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center">
          <div class="flex items-center justify-center space-x-2">
            <i class="fas fa-spinner fa-spin text-blue-600"></i>
            <span class="text-gray-600">Loading software tools...</span>
          </div>
        </td>
      </tr>
    `;

    const tools = await crud.getAll(crud.collections.SOFTWARE_TOOLS, {
      orderBy: { field: 'tool_name', direction: 'asc' },
    });

    toolsTableBody.innerHTML = '';

    if (tools.length === 0) {
      toolsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-gray-500">
            <i class="fas fa-tools text-3xl mb-2"></i>
            <p>No software tools found. Add your first tool!</p>
          </td>
        </tr>
      `;
      return;
    }

    tools.forEach((tool) => {
      const row = createSoftwareToolTableRow(tool);
      toolsTableBody.appendChild(row);
    });

    updatePaginationInfo('software', tools.length);
  } catch (error) {
    console.error('Error loading software tools:', error);
    showErrorState('software-table-body', 'Failed to load tools');
  }
}

/**
 * Load and display practice activities data
 */
async function loadActivitiesData() {
  try {
    const activitiesTableBody = document.querySelector(
      '#activities-table-body'
    );
    if (!activitiesTableBody) return;

    activitiesTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center">
          <div class="flex items-center justify-center space-x-2">
            <i class="fas fa-spinner fa-spin text-blue-600"></i>
            <span class="text-gray-600">Loading activities...</span>
          </div>
        </td>
      </tr>
    `;

    const activities = await crud.getAll(crud.collections.PRACTICE_ACTIVITIES, {
      orderBy: { field: 'difficulty', direction: 'asc' },
    });

    activitiesTableBody.innerHTML = '';

    if (activities.length === 0) {
      activitiesTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-gray-500">
            <i class="fas fa-tasks text-3xl mb-2"></i>
            <p>No activities found. Add your first activity!</p>
          </td>
        </tr>
      `;
      return;
    }

    activities.forEach((activity) => {
      const row = createActivityTableRow(activity);
      activitiesTableBody.appendChild(row);
    });

    updatePaginationInfo('activities', activities.length);
  } catch (error) {
    console.error('Error loading activities:', error);
    showErrorState('activities-table-body', 'Failed to load activities');
  }
}

/**
 * Load and display GitHub repositories data
 */
async function loadRepositoriesData() {
  try {
    const reposTableBody = document.querySelector('#repositories-table-body');
    if (!reposTableBody) return;

    reposTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center">
          <div class="flex items-center justify-center space-x-2">
            <i class="fab fa-github fa-spin text-gray-800"></i>
            <span class="text-gray-600">Loading repositories...</span>
          </div>
        </td>
      </tr>
    `;

    const repositories = await crud.getAll(crud.collections.GITHUB_REPOS, {
      orderBy: { field: 'stars', direction: 'desc' },
    });

    reposTableBody.innerHTML = '';

    if (repositories.length === 0) {
      reposTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-gray-500">
            <i class="fab fa-github text-3xl mb-2"></i>
            <p>No repositories found. Add your first repository!</p>
          </td>
        </tr>
      `;
      return;
    }

    repositories.forEach((repo) => {
      const row = createRepositoryTableRow(repo);
      reposTableBody.appendChild(row);
    });

    updatePaginationInfo('repositories', repositories.length);
  } catch (error) {
    console.error('Error loading repositories:', error);
    showErrorState('repositories-table-body', 'Failed to load repositories');
  }
}

// ==================== TABLE ROW CREATION FUNCTIONS ====================

/**
 * Create a table row for recordings
 */
function createRecordingTableRow(recording) {
  const row = document.createElement('tr');
  row.className = 'transition-colors hover:bg-gray-50';

  const statusClass =
    recording.is_active !== false
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  const statusText = recording.is_active !== false ? 'Active' : 'Inactive';

  row.innerHTML = `
    <td class="px-6 py-4">
      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">${
        recording.week || 'N/A'
      }</span>
    </td>
    <td class="px-6 py-4">
      <span class="text-gray-900 font-medium">Month ${
        recording.month || 'N/A'
      }</span>
    </td>
    <td class="px-6 py-4">
      <div>
        <p class="font-medium text-gray-900">${
          recording.title || 'Untitled'
        }</p>
        <p class="text-sm text-gray-500">${
          recording.description || 'No description'
        }</p>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="text-gray-600">${recording.duration || 'N/A'}</span>
    </td>
    <td class="px-6 py-4">
      <span class="${statusClass} px-2 py-1 rounded-full text-sm font-medium">${statusText}</span>
    </td>
    <td class="px-6 py-4">
      <div class="flex space-x-2">
        <button class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50" title="Edit" onclick="editRecording('${
          recording.id
        }')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50" title="View" onclick="viewRecording('${
          recording.id
        }')">
          <i class="fas fa-eye"></i>
        </button>
        <button class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50" title="Delete" onclick="deleteRecording('${
          recording.id
        }')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </td>
  `;

  return row;
}

/**
 * Create a table row for documentation
 */
function createDocumentationTableRow(doc) {
  const row = document.createElement('tr');
  row.className = 'transition-colors hover:bg-gray-50';

  const statusClass =
    doc.is_active !== false
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  const statusText = doc.is_active !== false ? 'Active' : 'Inactive';

  row.innerHTML = `
    <td class="px-6 py-4">
      <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <i class="${doc.icon || 'fas fa-book'} text-blue-600 text-xl"></i>
      </div>
    </td>
    <td class="px-6 py-4">
      <div>
        <p class="font-medium text-gray-900">${doc.title || 'Untitled'}</p>
        <p class="text-sm text-gray-500">${
          doc.description || 'No description'
        }</p>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">${
        doc.category || 'General'
      }</span>
    </td>
    <td class="px-6 py-4">
      <a href="${
        doc.url || '#'
      }" target="_blank" class="text-blue-600 hover:text-blue-800 text-sm">${
    doc.url ? new URL(doc.url).hostname : 'No URL'
  }</a>
    </td>
    <td class="px-6 py-4">
      <span class="${statusClass} px-2 py-1 rounded-full text-sm font-medium">${statusText}</span>
    </td>
    <td class="px-6 py-4">
      <div class="flex space-x-2">
        <button class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50" title="Edit" onclick="editDocumentation('${
          doc.id
        }')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50" title="View" onclick="window.open('${
          doc.url
        }', '_blank')">
          <i class="fas fa-external-link-alt"></i>
        </button>
        <button class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50" title="Delete" onclick="deleteDocumentation('${
          doc.id
        }')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </td>
  `;

  return row;
}

/**
 * Create a table row for VS Code extensions
 */
function createExtensionTableRow(extension) {
  const row = document.createElement('tr');
  row.className = 'transition-colors hover:bg-gray-50';

  const statusClass =
    extension.is_active !== false
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  const statusText = extension.is_active !== false ? 'Active' : 'Inactive';
  const stars =
    '★'.repeat(Math.floor(extension.rating || 0)) +
    '☆'.repeat(5 - Math.floor(extension.rating || 0));

  row.innerHTML = `
    <td class="px-6 py-4">
      <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <i class="fas fa-puzzle-piece text-blue-600 text-xl"></i>
      </div>
    </td>
    <td class="px-6 py-4">
      <div>
        <p class="font-medium text-gray-900">${
          extension.extension_name || 'Unnamed Extension'
        }</p>
        <p class="text-sm text-gray-500">${
          extension.description || 'No description'
        }</p>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="text-gray-600 font-medium">${
        extension.install_count || '0'
      }</span>
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center">
        <span class="text-yellow-400">${stars}</span>
        <span class="ml-2 text-sm text-gray-600">${
          extension.rating || '0.0'
        }</span>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">${
        extension.category || 'General'
      }</span>
    </td>
    <td class="px-6 py-4">
      <div class="flex space-x-2">
        <button class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50" title="Edit" onclick="editExtension('${
          extension.id
        }')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50" title="View" onclick="window.open('${
          extension.marketplace_url
        }', '_blank')">
          <i class="fas fa-external-link-alt"></i>
        </button>
        <button class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50" title="Delete" onclick="deleteExtension('${
          extension.id
        }')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </td>
  `;

  return row;
}

/**
 * Create a table row for YouTube channels
 */
function createYouTubeChannelTableRow(channel) {
  const row = document.createElement('tr');
  row.className = 'transition-colors hover:bg-gray-50';

  const statusClass =
    channel.is_active !== false
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  const statusText = channel.is_active !== false ? 'Active' : 'Inactive';

  row.innerHTML = `
    <td class="px-6 py-4">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
          <i class="fab fa-youtube text-red-600 text-xl"></i>
        </div>
        <div>
          <p class="font-medium text-gray-900">${
            channel.channel_name || 'Unnamed Channel'
          }</p>
          <p class="text-sm text-gray-500">${
            channel.description || 'No description'
          }</p>
        </div>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="text-gray-600 font-medium">${
        channel.subscriber_count || '0'
      }</span>
    </td>
    <td class="px-6 py-4">
      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">${
        channel.category || 'General'
      }</span>
    </td>
    <td class="px-6 py-4">
      <span class="text-gray-600">English</span>
    </td>
    <td class="px-6 py-4">
      <span class="${statusClass} px-2 py-1 rounded-full text-sm font-medium">${statusText}</span>
    </td>
    <td class="px-6 py-4">
      <div class="flex space-x-2">
        <button class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50" title="Edit" onclick="editChannel('${
          channel.id
        }')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50" title="View" onclick="window.open('${
          channel.channel_url
        }', '_blank')">
          <i class="fas fa-external-link-alt"></i>
        </button>
        <button class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50" title="Delete" onclick="deleteChannel('${
          channel.id
        }')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </td>
  `;

  return row;
}

/**
 * Create a table row for software tools
 */
function createSoftwareToolTableRow(tool) {
  const row = document.createElement('tr');
  row.className = 'transition-colors hover:bg-gray-50';

  const statusClass =
    tool.is_active !== false
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  const statusText = tool.is_active !== false ? 'Active' : 'Inactive';
  const priceClass = tool.is_free
    ? 'bg-green-100 text-green-800'
    : 'bg-orange-100 text-orange-800';
  const priceText = tool.is_free ? 'Free' : 'Paid';

  row.innerHTML = `
    <td class="px-6 py-4">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <i class="fas fa-tools text-blue-600 text-xl"></i>
        </div>
        <div>
          <p class="font-medium text-gray-900">${
            tool.tool_name || 'Unnamed Tool'
          }</p>
          <p class="text-sm text-gray-500">${
            tool.description || 'No description'
          }</p>
        </div>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">${
        tool.category || 'General'
      }</span>
    </td>
    <td class="px-6 py-4">
      <span class="${priceClass} px-2 py-1 rounded-full text-sm font-medium">${priceText}</span>
    </td>
    <td class="px-6 py-4">
      <span class="text-gray-600">${
        Array.isArray(tool.platform)
          ? tool.platform.join(', ')
          : tool.platform || 'Unknown'
      }</span>
    </td>
    <td class="px-6 py-4">
      <span class="${statusClass} px-2 py-1 rounded-full text-sm font-medium">${statusText}</span>
    </td>
    <td class="px-6 py-4">
      <div class="flex space-x-2">
        <button class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50" title="Edit" onclick="editTool('${
          tool.id
        }')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50" title="View" onclick="window.open('${
          tool.official_website || tool.download_url
        }', '_blank')">
          <i class="fas fa-external-link-alt"></i>
        </button>
        <button class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50" title="Delete" onclick="deleteTool('${
          tool.id
        }')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </td>
  `;

  return row;
}

/**
 * Create a table row for activities
 */
function createActivityTableRow(activity) {
  const row = document.createElement('tr');
  row.className = 'transition-colors hover:bg-gray-50';

  const statusClass =
    activity.is_active !== false
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  const statusText = activity.is_active !== false ? 'Active' : 'Inactive';

  let difficultyClass = 'bg-green-100 text-green-800';
  if (activity.difficulty === 'intermediate')
    difficultyClass = 'bg-yellow-100 text-yellow-800';
  if (activity.difficulty === 'advanced')
    difficultyClass = 'bg-red-100 text-red-800';

  row.innerHTML = `
    <td class="px-6 py-4">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <i class="fas fa-tasks text-blue-600 text-xl"></i>
        </div>
        <div>
          <p class="font-medium text-gray-900">${
            activity.activity_name || 'Unnamed Activity'
          }</p>
          <p class="text-sm text-gray-500">${
            activity.description || 'No description'
          }</p>
        </div>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">Activity</span>
    </td>
    <td class="px-6 py-4">
      <span class="${difficultyClass} px-2 py-1 rounded-full text-sm font-medium">${
    activity.difficulty || 'Beginner'
  }</span>
    </td>
    <td class="px-6 py-4">
      <span class="text-gray-600">${activity.estimated_time || 'N/A'}</span>
    </td>
    <td class="px-6 py-4">
      <span class="${statusClass} px-2 py-1 rounded-full text-sm font-medium">${statusText}</span>
    </td>
    <td class="px-6 py-4">
      <div class="flex space-x-2">
        <button class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50" title="Edit" onclick="editActivity('${
          activity.id
        }')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50" title="View" onclick="window.open('${
          activity.url
        }', '_blank')">
          <i class="fas fa-eye"></i>
        </button>
        <button class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50" title="Delete" onclick="deleteActivity('${
          activity.id
        }')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </td>
  `;

  return row;
}

/**
 * Create a table row for repositories
 */
function createRepositoryTableRow(repo) {
  const row = document.createElement('tr');
  row.className = 'transition-colors hover:bg-gray-50';

  const statusClass =
    repo.is_active !== false
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  const statusText = repo.is_active !== false ? 'Active' : 'Inactive';

  row.innerHTML = `
    <td class="px-6 py-4">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <i class="fab fa-github text-gray-800 text-xl"></i>
        </div>
        <div>
          <p class="font-medium text-gray-900">${
            repo.repo_name || 'Unnamed Repository'
          }</p>
          <p class="text-sm text-gray-500">${
            repo.description || 'No description'
          }</p>
        </div>
      </div>
    </td>
    <td class="px-6 py-4">
      <span class="text-gray-600 font-medium">${repo.stars || 0} ⭐</span>
    </td>
    <td class="px-6 py-4">
      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">${
        repo.language || 'JavaScript'
      }</span>
    </td>
    <td class="px-6 py-4">
      <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">${
        repo.category || 'General'
      }</span>
    </td>
    <td class="px-6 py-4">
      <span class="${statusClass} px-2 py-1 rounded-full text-sm font-medium">${statusText}</span>
    </td>
    <td class="px-6 py-4">
      <div class="flex space-x-2">
        <button class="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50" title="Edit" onclick="editRepository('${
          repo.id
        }')">
          <i class="fas fa-edit"></i>
        </button>
        <button class="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50" title="View" onclick="window.open('${
          repo.github_url
        }', '_blank')">
          <i class="fab fa-github"></i>
        </button>
        <button class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50" title="Delete" onclick="deleteRepository('${
          repo.id
        }')">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </td>
  `;

  return row;
}

// ==================== UTILITY FUNCTIONS ====================

function showErrorState(tableBodyId, message) {
  const tableBody = document.getElementById(tableBodyId);
  if (tableBody) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center text-red-500">
          <i class="fas fa-exclamation-triangle text-3xl mb-2"></i>
          <p>${message}</p>
          <button onclick="location.reload()" class="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Retry Load
          </button>
        </td>
      </tr>
    `;
  }
}

function updatePaginationInfo(section, totalItems) {
  const paginationInfo = document.querySelector(`#${section}-pagination-info`);
  if (paginationInfo) {
    paginationInfo.textContent = `Showing 1 to ${Math.min(
      totalItems,
      10
    )} of ${totalItems} results`;
  }
}

// ==================== INITIALIZATION ====================

// Sidebar Navigation
function initializeSidebarNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const formSections = document.querySelectorAll('.form-section');

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const targetSection = item.dataset.section;

      // Update active navigation
      navItems.forEach((nav) => nav.classList.remove('active'));
      item.classList.add('active');

      // Show corresponding section
      formSections.forEach((section) => {
        if (section.id === targetSection) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    });
  });
}

// ==================== ACTION HANDLERS ====================

// Placeholder functions for CRUD operations (to be implemented)
window.editRecording = function (id) {
  console.log('Edit recording:', id);
  // TODO: Implement edit functionality
};

window.viewRecording = function (id) {
  console.log('View recording:', id);
  // TODO: Implement view functionality
};

window.deleteRecording = function (id) {
  if (confirm('Are you sure you want to delete this recording?')) {
    crud
      .softDelete(crud.collections.RECORDINGS, id)
      .then(() => {
        console.log('Recording deleted successfully');
        loadRecordingsData(); // Reload data
      })
      .catch((error) => {
        console.error('Error deleting recording:', error);
        alert('Failed to delete recording');
      });
  }
};

window.editDocumentation = function (id) {
  console.log('Edit documentation:', id);
  // TODO: Implement edit functionality
};

window.deleteDocumentation = function (id) {
  if (confirm('Are you sure you want to delete this documentation?')) {
    crud
      .softDelete(crud.collections.DOCUMENTATION, id)
      .then(() => {
        console.log('Documentation deleted successfully');
        loadDocumentationData(); // Reload data
      })
      .catch((error) => {
        console.error('Error deleting documentation:', error);
        alert('Failed to delete documentation');
      });
  }
};

window.editExtension = function (id) {
  console.log('Edit extension:', id);
  // TODO: Implement edit functionality
};

window.deleteExtension = function (id) {
  if (confirm('Are you sure you want to delete this extension?')) {
    crud
      .softDelete(crud.collections.VSCODE_EXTENSIONS, id)
      .then(() => {
        console.log('Extension deleted successfully');
        loadExtensionsData(); // Reload data
      })
      .catch((error) => {
        console.error('Error deleting extension:', error);
        alert('Failed to delete extension');
      });
  }
};

window.editChannel = function (id) {
  console.log('Edit channel:', id);
  // TODO: Implement edit functionality
};

window.deleteChannel = function (id) {
  if (confirm('Are you sure you want to delete this channel?')) {
    crud
      .softDelete(crud.collections.YOUTUBE_CHANNELS, id)
      .then(() => {
        console.log('Channel deleted successfully');
        loadYouTubeChannelsData(); // Reload data
      })
      .catch((error) => {
        console.error('Error deleting channel:', error);
        alert('Failed to delete channel');
      });
  }
};

window.editTool = function (id) {
  console.log('Edit tool:', id);
  // TODO: Implement edit functionality
};

window.deleteTool = function (id) {
  if (confirm('Are you sure you want to delete this tool?')) {
    crud
      .softDelete(crud.collections.SOFTWARE_TOOLS, id)
      .then(() => {
        console.log('Tool deleted successfully');
        loadSoftwareToolsData(); // Reload data
      })
      .catch((error) => {
        console.error('Error deleting tool:', error);
        alert('Failed to delete tool');
      });
  }
};

window.editActivity = function (id) {
  console.log('Edit activity:', id);
  // TODO: Implement edit functionality
};

window.deleteActivity = function (id) {
  if (confirm('Are you sure you want to delete this activity?')) {
    crud
      .softDelete(crud.collections.PRACTICE_ACTIVITIES, id)
      .then(() => {
        console.log('Activity deleted successfully');
        loadActivitiesData(); // Reload data
      })
      .catch((error) => {
        console.error('Error deleting activity:', error);
        alert('Failed to delete activity');
      });
  }
};

window.editRepository = function (id) {
  console.log('Edit repository:', id);
  // TODO: Implement edit functionality
};

window.deleteRepository = function (id) {
  if (confirm('Are you sure you want to delete this repository?')) {
    crud
      .softDelete(crud.collections.GITHUB_REPOS, id)
      .then(() => {
        console.log('Repository deleted successfully');
        loadRepositoriesData(); // Reload data
      })
      .catch((error) => {
        console.error('Error deleting repository:', error);
        alert('Failed to delete repository');
      });
  }
};

// ==================== FORM HANDLING ====================

/**
 * Handle recordings form submission
 */
async function handleRecordingsForm(formData) {
  console.log('🎥 Processing recordings form data...');

  const data = {
    week: parseInt(formData.get('week')),
    month: parseInt(formData.get('month')),
    title: formData.get('title'),
    description: formData.get('description'),
    video_url: formData.get('video_url'),
    duration: formData.get('duration'),
    sessions: formData
      .get('sessions')
      .split(',')
      .map((s) => s.trim()),
    topics: formData
      .get('topics')
      .split(',')
      .map((t) => t.trim()),
    active: formData.get('active') === 'on',
    status: 'published',
  };

  console.log('📝 Recording data to save:', data);

  const docId = await crud.create(crud.collections.RECORDINGS, data);
  console.log('✅ Recording saved with ID:', docId);

  await loadRecordingsData(); // Refresh the table
  console.log('🔄 Recordings table refreshed');

  return docId;
}

/**
 * Handle documentation form submission
 */
async function handleDocumentationForm(formData) {
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    url: formData.get('url'),
    category: formData.get('category'),
    tags: formData
      .get('tags')
      .split(',')
      .map((t) => t.trim()),
    difficulty: formData.get('difficulty'),
    active: formData.get('active') === 'on',
    status: 'published',
  };

  const docId = await crud.create(crud.collections.DOCUMENTATION, data);
  await loadDocumentationData();
  return docId;
}

/**
 * Handle extensions form submission
 */
async function handleExtensionsForm(formData) {
  const data = {
    name: formData.get('name'),
    description: formData.get('description'),
    extension_id: formData.get('extension_id'),
    category: formData.get('category'),
    publisher: formData.get('publisher'),
    install_command: formData.get('install_command'),
    tags: formData
      .get('tags')
      .split(',')
      .map((t) => t.trim()),
    active: formData.get('active') === 'on',
    status: 'published',
  };

  const docId = await crud.create(crud.collections.VSCODE_EXTENSIONS, data);
  await loadExtensionsData();
  return docId;
}

/**
 * Handle YouTube channels form submission
 */
async function handleYouTubeForm(formData) {
  const data = {
    channel_name: formData.get('channel_name'),
    channel_url: formData.get('channel_url'),
    description: formData.get('description'),
    category: formData.get('category'),
    subscriber_count: formData.get('subscriber_count'),
    language: formData.get('language'),
    tags: formData
      .get('tags')
      .split(',')
      .map((t) => t.trim()),
    active: formData.get('active') === 'on',
    status: 'published',
  };

  const docId = await crud.create(crud.collections.YOUTUBE_CHANNELS, data);
  await loadYouTubeChannelsData();
  return docId;
}

/**
 * Handle software tools form submission
 */
async function handleSoftwareForm(formData) {
  const data = {
    name: formData.get('name'),
    description: formData.get('description'),
    download_url: formData.get('download_url'),
    category: formData.get('category'),
    platform: formData.get('platform'),
    version: formData.get('version'),
    license: formData.get('license'),
    is_free: formData.get('is_free') === 'on',
    tags: formData
      .get('tags')
      .split(',')
      .map((t) => t.trim()),
    active: formData.get('active') === 'on',
    status: 'published',
  };

  const docId = await crud.create(crud.collections.SOFTWARE_TOOLS, data);
  await loadSoftwareToolsData();
  return docId;
}

/**
 * Handle activities form submission
 */
async function handleActivitiesForm(formData) {
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    instructions: formData.get('instructions'),
    difficulty: formData.get('difficulty'),
    estimated_time: formData.get('estimated_time'),
    category: formData.get('category'),
    tags: formData
      .get('tags')
      .split(',')
      .map((t) => t.trim()),
    prerequisites: formData
      .get('prerequisites')
      .split(',')
      .map((p) => p.trim()),
    active: formData.get('active') === 'on',
    status: 'published',
  };

  const docId = await crud.create(crud.collections.PRACTICE_ACTIVITIES, data);
  await loadActivitiesData();
  return docId;
}

/**
 * Handle repositories form submission
 */
async function handleRepositoriesForm(formData) {
  const data = {
    name: formData.get('name'),
    description: formData.get('description'),
    repository_url: formData.get('repository_url'),
    language: formData.get('language'),
    stars: parseInt(formData.get('stars')) || 0,
    level: formData.get('level'),
    category: formData.get('category'),
    tags: formData
      .get('tags')
      .split(',')
      .map((t) => t.trim()),
    active: formData.get('active') === 'on',
    status: 'published',
  };

  const docId = await crud.create(crud.collections.GITHUB_REPOS, data);
  await loadRepositoriesData();
  return docId;
}

/**
 * Main form submission handler
 */
function setupFormHandlers() {
  // Get all forms and add submission handlers
  const formHandlers = {
    'recordings-form': handleRecordingsForm,
    'documentation-form': handleDocumentationForm,
    'extensions-form': handleExtensionsForm,
    'youtube-form': handleYouTubeForm,
    'software-form': handleSoftwareForm,
    'activities-form': handleActivitiesForm,
    'repositories-form': handleRepositoriesForm,
  };

  Object.entries(formHandlers).forEach(([formId, handler]) => {
    const form = document.getElementById(formId);
    if (form) {
      // Add a flag to prevent duplicate submissions
      let isSubmitting = false;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Prevent duplicate submissions
        if (isSubmitting) {
          console.log('Form submission already in progress, ignoring...');
          return;
        }

        isSubmitting = true;
        console.log(`Submitting form: ${formId}`);

        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        try {
          // Show loading state
          button.innerHTML =
            '<i class="mr-2 fas fa-spinner fa-spin"></i>Saving...';
          button.disabled = true;

          // Submit form data
          const formData = new FormData(form);
          await handler(formData);

          // Show success state
          button.innerHTML = '<i class="mr-2 fas fa-check"></i>Saved!';
          button.classList.remove('btn-primary');
          button.classList.add('btn-success');

          // Reset form
          form.reset();

          // Reset button after delay
          setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('btn-success');
            button.classList.add('btn-primary');
            button.disabled = false;
            isSubmitting = false; // Reset submission flag
          }, 2000);
        } catch (error) {
          console.error('Error saving data:', error);

          // Show error state
          button.innerHTML =
            '<i class="mr-2 fas fa-exclamation-triangle"></i>Error!';
          button.classList.remove('btn-primary');
          button.classList.add('btn-danger');

          // Reset button after delay
          setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('btn-danger');
            button.classList.add('btn-primary');
            button.disabled = false;
            isSubmitting = false; // Reset submission flag
          }, 2000);

          alert('Error saving data: ' + error.message);
        }
      });
    }
  });
}

// Form validation and enhancement functions
function setupInputEnhancements() {
  const inputs = document.querySelectorAll('.modern-input, .modern-select');
  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      input.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', () => {
      input.style.transform = 'scale(1)';
    });
  });
}

// ==================== SEARCH FUNCTIONALITY ====================

// Search functionality for each table
function setupSearchFunctionality() {
  const searchInputs = document.querySelectorAll(
    'input[placeholder*="Search"]'
  );

  searchInputs.forEach((input) => {
    input.addEventListener(
      'input',
      debounce(async function () {
        const searchTerm = this.value.toLowerCase();
        const tableBody = this.closest('.glass-card').querySelector('tbody');

        if (!searchTerm) {
          // Reload original data if search is cleared
          const sectionName = this.getAttribute('data-section');
          if (sectionName) {
            await reloadSectionData(sectionName);
          }
          return;
        }

        // Filter table rows based on search term
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach((row) => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      }, 300)
    );
  });
}

// Debounce function to limit search frequency
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

async function reloadSectionData(sectionName) {
  switch (sectionName) {
    case 'recordings':
      await loadRecordingsData();
      break;
    case 'documentation':
      await loadDocumentationData();
      break;
    case 'extensions':
      await loadExtensionsData();
      break;
    case 'youtube':
      await loadYouTubeChannelsData();
      break;
    case 'software':
      await loadSoftwareToolsData();
      break;
    case 'activities':
      await loadActivitiesData();
      break;
    case 'repositories':
      await loadRepositoriesData();
      break;
  }
}

// ==================== INITIALIZATION ====================

// Main initialization function
async function initializeAdminDashboard() {
  console.log('🚀 Initializing Admin Dashboard...');

  try {
    // Load all data
    await Promise.all([
      loadRecordingsData(),
      loadDocumentationData(),
      loadExtensionsData(),
      loadYouTubeChannelsData(),
      loadSoftwareToolsData(),
      loadActivitiesData(),
      loadRepositoriesData(),
    ]);

    // Initialize sidebar navigation
    initializeSidebarNavigation();

    // Setup search functionality
    setupSearchFunctionality();

    // Setup form handlers
    setupFormHandlers();

    // Setup input enhancements
    setupInputEnhancements();

    console.log('✅ Admin Dashboard initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing admin dashboard:', error);
  }
}

// Initialize when DOM is loaded - SINGLE EVENT LISTENER
document.addEventListener('DOMContentLoaded', initializeAdminDashboard);
