document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".grid");
    const gridItems = document.querySelectorAll(".grid-item");

    const windowWidth = window.innerWidth;

    const margin = 10;
    const padding = 5;

    let columnWidth = 0.25 * windowWidth - margin - padding * 2;

    const numberOfColumns = Math.floor(windowWidth / columnWidth);

    columnWidth = (windowWidth - margin * (numberOfColumns + 1)) / numberOfColumns;

    const itemHeights = [];

    for (let i = 0; i < gridItems.length; i++) {
        const item = gridItems[i];

        item.style.width = columnWidth - padding * 2 + 'px';

        const itemHeight = item.offsetHeight;

        itemHeights.push(itemHeight);
    }

    const columnHeights = [];
    for (let i = 0; i < numberOfColumns; i++) {
        columnHeights.push(0);
    }

    for (let i = 0; i < gridItems.length; i++) {
        const item = gridItems[i];
    
        const shortestColumn = Math.min(...columnHeights);
        const shortestColumnIndex = columnHeights.indexOf(shortestColumn);
    
        item.style.left = margin + (columnWidth + margin) * shortestColumnIndex + 'px';
        item.style.top = shortestColumn + margin + 'px';
    
        columnHeights[shortestColumnIndex] += itemHeights[i] + margin;
    }

    const tallestColumn = Math.max(...columnHeights);

    grid.style.height = tallestColumn + margin + 'px'
  
})