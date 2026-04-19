document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookmark-form');
    const bookmarkList = document.getElementById('bookmark-list');
    const tagFilters = document.getElementById('tag-filters');
    let currentTag = null;

    const fetchBookmarks = async (tag = null) => {
        let url = '/api/bookmarks';
        if (tag) url += `?tag=${tag}`;
        
        const response = await fetch(url);
        const bookmarks = await response.json();
        renderBookmarks(bookmarks);
    };

    const fetchTags = async () => {
        const response = await fetch('/api/tags');
        const tags = await response.json();
        renderTags(tags);
    };

    const renderTags = (tags) => {
        tagFilters.innerHTML = '<button class="tag-btn ' + (!currentTag ? 'active' : '') + '" data-tag="">All</button>';
        tags.forEach(tag => {
            const btn = document.createElement('button');
            btn.className = `tag-btn ${currentTag === tag ? 'active' : ''}`;
            btn.textContent = tag;
            btn.dataset.tag = tag;
            tagFilters.appendChild(btn);
        });
    };

    const renderBookmarks = (bookmarks) => {
        bookmarkList.innerHTML = bookmarks.length === 0 
            ? '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No bookmarks found.</p>'
            : '';
            
        bookmarks.forEach(b => {
            const item = document.createElement('div');
            item.className = 'bookmark-item';
            item.innerHTML = `
                <div class="bookmark-info">
                    <h3>${b.title}</h3>
                    <a href="${b.url}" target="_blank">${b.url}</a>
                    <div class="bookmark-tags">
                        ${b.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteBookmark('${b._id}')">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            bookmarkList.appendChild(item);
        });
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = document.getElementById('url').value;
        const title = document.getElementById('title').value;
        const tags = document.getElementById('tags').value.split(',').map(t => t.trim()).filter(t => t);

        const response = await fetch('/api/bookmarks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, title, tags })
        });

        if (response.ok) {
            form.reset();
            fetchBookmarks(currentTag);
            fetchTags();
        }
    });

    tagFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('tag-btn')) {
            currentTag = e.target.dataset.tag || null;
            document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            fetchBookmarks(currentTag);
        }
    });

    window.deleteBookmark = async (id) => {
        if (confirm('Are you sure you want to delete this bookmark?')) {
            const response = await fetch(`/api/bookmarks/${id}`, { method: 'DELETE' });
            if (response.ok) {
                fetchBookmarks(currentTag);
                fetchTags();
            }
        }
    };

    fetchBookmarks();
    fetchTags();
});
