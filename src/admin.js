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
window.editRecording = async function (id) {
  console.log('Edit recording:', id);
  try {
    // Fetch the recording data
    const recording = await crud.getById(crud.collections.RECORDINGS, id);
    if (!recording) {
      alert('Recording not found!');
      return;
    }

    // Switch to recordings section
    switchToSection('recordings');

    // Populate the form
    populateRecordingForm(recording);

    // Set edit mode
    setEditMode('recordings-form', id);
  } catch (error) {
    console.error('Error loading recording for edit:', error);
    alert('Failed to load recording data');
  }
};

window.viewRecording = function (id) {
  console.log('View recording:', id);
  // TODO: Implement view functionality
};

window.deleteRecording = async function (id) {
  if (
    confirm(
      "🗑️ Are you sure you want to delete this recording?\n\nThis action will mark the recording as inactive but won't permanently remove it."
    )
  ) {
    try {
      console.log('🗑️ Deleting recording:', id);

      // Show loading feedback
      const button = document.querySelector(
        `[onclick="deleteRecording('${id}')"]`
      );
      if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;

        setTimeout(() => {
          if (button) {
            button.innerHTML = originalText;
            button.disabled = false;
          }
        }, 2000);
      }

      await crud.softDelete(crud.collections.RECORDINGS, id);
      console.log('✅ Recording deleted successfully');

      // Show success message
      showSuccessMessage('Recording deleted successfully!');

      await loadRecordingsData(); // Reload data
    } catch (error) {
      console.error('❌ Error deleting recording:', error);
      showErrorMessage('Failed to delete recording: ' + error.message);
    }
  }
};

window.editDocumentation = async function (id) {
  console.log('Edit documentation:', id);
  try {
    // Fetch the documentation data
    const doc = await crud.getById(crud.collections.DOCUMENTATION, id);
    if (!doc) {
      alert('Documentation not found!');
      return;
    }

    // Switch to documentation section
    switchToSection('documentation');

    // Populate the form
    populateDocumentationForm(doc);

    // Set edit mode
    setEditMode('documentation-form', id);
  } catch (error) {
    console.error('Error loading documentation for edit:', error);
    alert('Failed to load documentation data');
  }
};

window.deleteDocumentation = async function (id) {
  if (
    confirm(
      "🗑️ Are you sure you want to delete this documentation?\n\nThis action will mark it as inactive but won't permanently remove it."
    )
  ) {
    try {
      console.log('🗑️ Deleting documentation:', id);
      await crud.softDelete(crud.collections.DOCUMENTATION, id);
      console.log('✅ Documentation deleted successfully');
      showSuccessMessage('Documentation deleted successfully!');
      await loadDocumentationData();
    } catch (error) {
      console.error('❌ Error deleting documentation:', error);
      showErrorMessage('Failed to delete documentation: ' + error.message);
    }
  }
};

window.editExtension = async function (id) {
  console.log('Edit extension:', id);
  try {
    // Fetch the extension data
    const ext = await crud.getById(crud.collections.VSCODE_EXTENSIONS, id);
    if (!ext) {
      alert('Extension not found!');
      return;
    }

    // Switch to extensions section
    switchToSection('extensions');

    // Populate the form
    populateExtensionForm(ext);

    // Set edit mode
    setEditMode('extensions-form', id);
  } catch (error) {
    console.error('Error loading extension for edit:', error);
    alert('Failed to load extension data');
  }
};

window.deleteExtension = async function (id) {
  if (
    confirm(
      "🗑️ Are you sure you want to delete this extension?\n\nThis action will mark it as inactive but won't permanently remove it."
    )
  ) {
    try {
      console.log('🗑️ Deleting extension:', id);
      await crud.softDelete(crud.collections.VSCODE_EXTENSIONS, id);
      console.log('✅ Extension deleted successfully');
      showSuccessMessage('Extension deleted successfully!');
      await loadExtensionsData();
    } catch (error) {
      console.error('❌ Error deleting extension:', error);
      showErrorMessage('Failed to delete extension: ' + error.message);
    }
  }
};

window.editChannel = async function (id) {
  console.log('Edit channel:', id);
  try {
    // Fetch the channel data
    const channel = await crud.getById(crud.collections.YOUTUBE_CHANNELS, id);
    if (!channel) {
      alert('Channel not found!');
      return;
    }

    // Switch to youtube section
    switchToSection('youtube');

    // Populate the form
    populateYouTubeForm(channel);

    // Set edit mode
    setEditMode('youtube-form', id);
  } catch (error) {
    console.error('Error loading channel for edit:', error);
    alert('Failed to load channel data');
  }
};

window.deleteChannel = async function (id) {
  if (
    confirm(
      "🗑️ Are you sure you want to delete this YouTube channel?\n\nThis action will mark it as inactive but won't permanently remove it."
    )
  ) {
    try {
      console.log('🗑️ Deleting channel:', id);
      await crud.softDelete(crud.collections.YOUTUBE_CHANNELS, id);
      console.log('✅ Channel deleted successfully');
      showSuccessMessage('YouTube channel deleted successfully!');
      await loadYouTubeChannelsData();
    } catch (error) {
      console.error('❌ Error deleting channel:', error);
      showErrorMessage('Failed to delete channel: ' + error.message);
    }
  }
};

window.editTool = async function (id) {
  console.log('Edit tool:', id);
  try {
    // Fetch the tool data
    const tool = await crud.getById(crud.collections.SOFTWARE_TOOLS, id);
    if (!tool) {
      alert('Tool not found!');
      return;
    }

    // Switch to software section
    switchToSection('software');

    // Populate the form
    populateSoftwareForm(tool);

    // Set edit mode
    setEditMode('software-form', id);
  } catch (error) {
    console.error('Error loading tool for edit:', error);
    alert('Failed to load tool data');
  }
};

window.deleteTool = async function (id) {
  if (
    confirm(
      "🗑️ Are you sure you want to delete this software tool?\n\nThis action will mark it as inactive but won't permanently remove it."
    )
  ) {
    try {
      console.log('🗑️ Deleting tool:', id);
      await crud.softDelete(crud.collections.SOFTWARE_TOOLS, id);
      console.log('✅ Tool deleted successfully');
      showSuccessMessage('Software tool deleted successfully!');
      await loadSoftwareToolsData();
    } catch (error) {
      console.error('❌ Error deleting tool:', error);
      showErrorMessage('Failed to delete tool: ' + error.message);
    }
  }
};

window.editActivity = async function (id) {
  console.log('Edit activity:', id);
  try {
    // Fetch the activity data
    const activity = await crud.getById(
      crud.collections.PRACTICE_ACTIVITIES,
      id
    );
    if (!activity) {
      alert('Activity not found!');
      return;
    }

    // Switch to activities section
    switchToSection('activities');

    // Populate the form
    populateActivityForm(activity);

    // Set edit mode
    setEditMode('activities-form', id);
  } catch (error) {
    console.error('Error loading activity for edit:', error);
    alert('Failed to load activity data');
  }
};

window.deleteActivity = async function (id) {
  if (
    confirm(
      "🗑️ Are you sure you want to delete this practice activity?\n\nThis action will mark it as inactive but won't permanently remove it."
    )
  ) {
    try {
      console.log('🗑️ Deleting activity:', id);
      await crud.softDelete(crud.collections.PRACTICE_ACTIVITIES, id);
      console.log('✅ Activity deleted successfully');
      showSuccessMessage('Practice activity deleted successfully!');
      await loadActivitiesData();
    } catch (error) {
      console.error('❌ Error deleting activity:', error);
      showErrorMessage('Failed to delete activity: ' + error.message);
    }
  }
};

window.editRepository = async function (id) {
  console.log('Edit repository:', id);
  try {
    // Fetch the repository data
    const repo = await crud.getById(crud.collections.GITHUB_REPOS, id);
    if (!repo) {
      alert('Repository not found!');
      return;
    }

    // Switch to repositories section
    switchToSection('repositories');

    // Populate the form
    populateRepositoryForm(repo);

    // Set edit mode
    setEditMode('repositories-form', id);
  } catch (error) {
    console.error('Error loading repository for edit:', error);
    alert('Failed to load repository data');
  }
};

window.deleteRepository = async function (id) {
  if (
    confirm(
      "🗑️ Are you sure you want to delete this repository?\n\nThis action will mark it as inactive but won't permanently remove it."
    )
  ) {
    try {
      console.log('🗑️ Deleting repository:', id);
      await crud.softDelete(crud.collections.GITHUB_REPOS, id);
      console.log('✅ Repository deleted successfully');
      showSuccessMessage('Repository deleted successfully!');
      await loadRepositoriesData();
    } catch (error) {
      console.error('❌ Error deleting repository:', error);
      showErrorMessage('Failed to delete repository: ' + error.message);
    }
  }
};

// ==================== EDIT MODE MANAGEMENT ====================

// Store current edit mode state
let editMode = {
  isEditing: false,
  formId: null,
  recordId: null,
};

/**
 * Switch to a specific section in the admin dashboard
 */
function switchToSection(sectionId) {
  const navItems = document.querySelectorAll('.nav-item');
  const formSections = document.querySelectorAll('.form-section');

  // Update active navigation
  navItems.forEach((nav) => {
    nav.classList.remove('active');
    if (nav.dataset.section === sectionId) {
      nav.classList.add('active');
    }
  });

  // Show corresponding section
  formSections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}

/**
 * Set edit mode for a form
 */
function setEditMode(formId, recordId) {
  editMode = {
    isEditing: true,
    formId: formId,
    recordId: recordId,
  };

  // Update form button text and add cancel button
  const form = document.getElementById(formId);
  if (form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = originalText.replace('Save', 'Update');
      submitButton.dataset.originalText = originalText;

      // Add cancel button if it doesn't exist
      const buttonContainer = submitButton.parentElement;
      if (!form.querySelector('.cancel-edit-btn')) {
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.className =
          'px-8 py-3 font-semibold text-gray-700 transition-colors bg-gray-200 rounded-lg cancel-edit-btn hover:bg-gray-300';
        cancelButton.innerHTML = '<i class="mr-2 fas fa-times"></i>Cancel Edit';
        cancelButton.onclick = () => window.cancelEdit();
        buttonContainer.appendChild(cancelButton);
      }
    }
  }

  console.log(`📝 Edit mode activated for ${formId} with record ${recordId}`);
}

/**
 * Clear edit mode
 */
function clearEditMode() {
  if (editMode.formId) {
    const form = document.getElementById(editMode.formId);
    if (form) {
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton && submitButton.dataset.originalText) {
        submitButton.innerHTML = submitButton.dataset.originalText;
      }
      form.reset();

      // Remove cancel button if it exists
      const cancelButton = form.querySelector('.cancel-edit-btn');
      if (cancelButton) {
        cancelButton.remove();
      }
    }
  }

  editMode = {
    isEditing: false,
    formId: null,
    recordId: null,
  };

  console.log('🔄 Edit mode cleared');
}

/**
 * Cancel edit mode (user-triggered)
 */
window.cancelEdit = function () {
  if (
    confirm(
      'Are you sure you want to cancel editing? Any unsaved changes will be lost.'
    )
  ) {
    clearEditMode();
  }
};

// ==================== FORM POPULATION FUNCTIONS ====================

/**
 * Populate recordings form with data
 */
function populateRecordingForm(data) {
  const form = document.getElementById('recordings-form');
  if (!form) return;

  form.querySelector('[name="week"]').value = data.week || '';
  form.querySelector('[name="month"]').value = data.month || '';
  form.querySelector('[name="title"]').value = data.title || '';
  form.querySelector('[name="description"]').value = data.description || '';
  form.querySelector('[name="video_url"]').value = data.video_url || '';
  form.querySelector('[name="duration"]').value = data.duration || '';
  form.querySelector('[name="sessions"]').value = Array.isArray(data.sessions)
    ? data.sessions.join(', ')
    : data.sessions || '';
  form.querySelector('[name="topics"]').value = Array.isArray(data.topics)
    ? data.topics.join(', ')
    : data.topics || '';
  form.querySelector('[name="active"]').checked = data.active !== false;
}

/**
 * Populate documentation form with data
 */
function populateDocumentationForm(data) {
  const form = document.getElementById('documentation-form');
  if (!form) return;

  form.querySelector('[name="title"]').value = data.title || '';
  form.querySelector('[name="description"]').value = data.description || '';
  form.querySelector('[name="url"]').value = data.url || '';
  form.querySelector('[name="category"]').value = data.category || '';
  form.querySelector('[name="difficulty"]').value =
    data.difficulty || data.difficulty_level || '';
  form.querySelector('[name="tags"]').value = Array.isArray(data.tags)
    ? data.tags.join(', ')
    : data.tags || '';
  form.querySelector('[name="active"]').checked = data.active !== false;
}

/**
 * Populate extension form with data
 */
function populateExtensionForm(data) {
  const form = document.getElementById('extensions-form');
  if (!form) return;

  form.querySelector('[name="name"]').value =
    data.name || data.extension_name || '';
  form.querySelector('[name="description"]').value = data.description || '';
  form.querySelector('[name="extension_id"]').value = data.extension_id || '';
  form.querySelector('[name="category"]').value = data.category || '';
  form.querySelector('[name="publisher"]').value = data.publisher || '';
  form.querySelector('[name="install_command"]').value =
    data.install_command || '';
  form.querySelector('[name="tags"]').value = Array.isArray(data.tags)
    ? data.tags.join(', ')
    : data.tags || '';
  form.querySelector('[name="active"]').checked = data.active !== false;
}

/**
 * Populate YouTube form with data
 */
function populateYouTubeForm(data) {
  const form = document.getElementById('youtube-form');
  if (!form) return;

  form.querySelector('[name="channel_name"]').value = data.channel_name || '';
  form.querySelector('[name="channel_url"]').value = data.channel_url || '';
  form.querySelector('[name="description"]').value = data.description || '';
  form.querySelector('[name="category"]').value = data.category || '';
  form.querySelector('[name="subscriber_count"]').value =
    data.subscriber_count || '';
  form.querySelector('[name="language"]').value = data.language || '';
  form.querySelector('[name="tags"]').value = Array.isArray(data.tags)
    ? data.tags.join(', ')
    : data.tags || '';
  form.querySelector('[name="active"]').checked = data.active !== false;
}

/**
 * Populate software form with data
 */
function populateSoftwareForm(data) {
  const form = document.getElementById('software-form');
  if (!form) return;

  form.querySelector('[name="name"]').value = data.name || data.tool_name || '';
  form.querySelector('[name="description"]').value = data.description || '';
  form.querySelector('[name="download_url"]').value = data.download_url || '';
  form.querySelector('[name="category"]').value = data.category || '';
  form.querySelector('[name="platform"]').value = data.platform || '';
  form.querySelector('[name="version"]').value = data.version || '';
  form.querySelector('[name="license"]').value = data.license || '';
  form.querySelector('[name="is_free"]').checked = data.is_free !== false;
  form.querySelector('[name="tags"]').value = Array.isArray(data.tags)
    ? data.tags.join(', ')
    : data.tags || '';
  form.querySelector('[name="active"]').checked = data.active !== false;
}

/**
 * Populate activity form with data
 */
function populateActivityForm(data) {
  const form = document.getElementById('activities-form');
  if (!form) return;

  form.querySelector('[name="title"]').value =
    data.title || data.activity_name || '';
  form.querySelector('[name="description"]').value = data.description || '';
  form.querySelector('[name="instructions"]').value = data.instructions || '';
  form.querySelector('[name="difficulty"]').value = data.difficulty || '';
  form.querySelector('[name="estimated_time"]').value =
    data.estimated_time || '';
  form.querySelector('[name="category"]').value = data.category || '';
  form.querySelector('[name="tags"]').value = Array.isArray(data.tags)
    ? data.tags.join(', ')
    : data.tags || '';
  form.querySelector('[name="prerequisites"]').value = Array.isArray(
    data.prerequisites
  )
    ? data.prerequisites.join(', ')
    : data.prerequisites || '';
  form.querySelector('[name="active"]').checked = data.active !== false;
}

/**
 * Populate repository form with data
 */
function populateRepositoryForm(data) {
  const form = document.getElementById('repositories-form');
  if (!form) return;

  form.querySelector('[name="name"]').value = data.name || data.repo_name || '';
  form.querySelector('[name="description"]').value = data.description || '';
  form.querySelector('[name="repository_url"]').value =
    data.repository_url || data.github_url || '';
  form.querySelector('[name="language"]').value = data.language || '';
  form.querySelector('[name="stars"]').value = data.stars || '';
  form.querySelector('[name="level"]').value = data.level || '';
  form.querySelector('[name="category"]').value = data.category || '';
  form.querySelector('[name="tags"]').value =
    Array.isArray(data.tags) || Array.isArray(data.topics)
      ? (data.tags || data.topics).join(', ')
      : data.tags || data.topics || '';
  form.querySelector('[name="active"]').checked = data.active !== false;
}

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

  let result;
  if (editMode.isEditing && editMode.recordId) {
    // Update existing record
    result = await crud.update(
      crud.collections.RECORDINGS,
      editMode.recordId,
      data
    );
    console.log('✅ Recording updated with ID:', editMode.recordId);
  } else {
    // Create new record
    result = await crud.create(crud.collections.RECORDINGS, data);
    console.log('✅ Recording saved with ID:', result);
  }

  await loadRecordingsData(); // Refresh the table
  clearEditMode(); // Clear edit mode
  console.log('🔄 Recordings table refreshed');

  return result;
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

  let result;
  if (editMode.isEditing && editMode.recordId) {
    result = await crud.update(
      crud.collections.DOCUMENTATION,
      editMode.recordId,
      data
    );
    console.log('✅ Documentation updated with ID:', editMode.recordId);
  } else {
    result = await crud.create(crud.collections.DOCUMENTATION, data);
    console.log('✅ Documentation saved with ID:', result);
  }

  await loadDocumentationData();
  clearEditMode();
  return result;
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

  let result;
  if (editMode.isEditing && editMode.recordId) {
    result = await crud.update(
      crud.collections.VSCODE_EXTENSIONS,
      editMode.recordId,
      data
    );
    console.log('✅ Extension updated with ID:', editMode.recordId);
  } else {
    result = await crud.create(crud.collections.VSCODE_EXTENSIONS, data);
    console.log('✅ Extension saved with ID:', result);
  }

  await loadExtensionsData();
  clearEditMode();
  return result;
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

  let result;
  if (editMode.isEditing && editMode.recordId) {
    result = await crud.update(
      crud.collections.YOUTUBE_CHANNELS,
      editMode.recordId,
      data
    );
    console.log('✅ YouTube channel updated with ID:', editMode.recordId);
  } else {
    result = await crud.create(crud.collections.YOUTUBE_CHANNELS, data);
    console.log('✅ YouTube channel saved with ID:', result);
  }

  await loadYouTubeChannelsData();
  clearEditMode();
  return result;
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

  let result;
  if (editMode.isEditing && editMode.recordId) {
    result = await crud.update(
      crud.collections.SOFTWARE_TOOLS,
      editMode.recordId,
      data
    );
    console.log('✅ Software tool updated with ID:', editMode.recordId);
  } else {
    result = await crud.create(crud.collections.SOFTWARE_TOOLS, data);
    console.log('✅ Software tool saved with ID:', result);
  }

  await loadSoftwareToolsData();
  clearEditMode();
  return result;
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

  let result;
  if (editMode.isEditing && editMode.recordId) {
    result = await crud.update(
      crud.collections.PRACTICE_ACTIVITIES,
      editMode.recordId,
      data
    );
    console.log('✅ Activity updated with ID:', editMode.recordId);
  } else {
    result = await crud.create(crud.collections.PRACTICE_ACTIVITIES, data);
    console.log('✅ Activity saved with ID:', result);
  }

  await loadActivitiesData();
  clearEditMode();
  return result;
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

  let result;
  if (editMode.isEditing && editMode.recordId) {
    result = await crud.update(
      crud.collections.GITHUB_REPOS,
      editMode.recordId,
      data
    );
    console.log('✅ Repository updated with ID:', editMode.recordId);
  } else {
    result = await crud.create(crud.collections.GITHUB_REPOS, data);
    console.log('✅ Repository saved with ID:', result);
  }

  await loadRepositoriesData();
  clearEditMode();
  return result;
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

// Utility functions for user feedback
function showSuccessMessage(message) {
  console.log('✅', message);

  // Remove any existing message
  const existingMessage = document.querySelector('.success-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create success message element
  const messageDiv = document.createElement('div');
  messageDiv.className = 'success-message';
  messageDiv.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: #22c55e;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideInRight 0.3s ease-out;
    ">
      <i class="fas fa-check-circle"></i>
      ${message}
    </div>
    <style>
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    </style>
  `;

  document.body.appendChild(messageDiv);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (messageDiv && messageDiv.parentNode) {
      messageDiv.style.animation = 'slideInRight 0.3s ease-out reverse';
      setTimeout(() => messageDiv.remove(), 300);
    }
  }, 3000);
}

function showErrorMessage(message) {
  console.error('❌', message);

  // Remove any existing message
  const existingMessage = document.querySelector('.error-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create error message element
  const messageDiv = document.createElement('div');
  messageDiv.className = 'error-message';
  messageDiv.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideInRight 0.3s ease-out;
    ">
      <i class="fas fa-exclamation-triangle"></i>
      ${message}
    </div>
    <style>
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    </style>
  `;

  document.body.appendChild(messageDiv);

  // Auto remove after 5 seconds (longer for errors)
  setTimeout(() => {
    if (messageDiv && messageDiv.parentNode) {
      messageDiv.style.animation = 'slideInRight 0.3s ease-out reverse';
      setTimeout(() => messageDiv.remove(), 300);
    }
  }, 5000);
}

// Initialize when DOM is loaded - SINGLE EVENT LISTENER
document.addEventListener('DOMContentLoaded', initializeAdminDashboard);
