document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itemForm');
    const itemNameInput = document.getElementById('itemName');
    const itemList = document.getElementById('itemList');

    // Initialize items array from localStorage or empty array
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // Function to render items to the list
    function renderItems() {
        itemList.innerHTML = ''; // Clear the list
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteItem(index);
            });

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', () => {
                updateItem(index);
            });

            li.appendChild(deleteButton);
            li.appendChild(updateButton);

            itemList.appendChild(li);
        });
    }

    // Add item
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newItem = itemNameInput.value.trim();
        if (newItem) {
            items.push(newItem);
            localStorage.setItem('items', JSON.stringify(items));
            renderItems();
            itemNameInput.value = '';
        }
    });

    // Delete item
    function deleteItem(index) {
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
    }

    // Update item
    function updateItem(index) {
        const updatedItem = prompt('Update the item:', items[index]);
        if (updatedItem) {
            items[index] = updatedItem;
            localStorage.setItem('items', JSON.stringify(items));
            renderItems();
        }
    }

    // Initial render
    renderItems();
});
