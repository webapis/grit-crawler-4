async function extractImageUrls(page, imageSelector) {
    return await page.evaluate(() => {

        var imgElements = Array.from(document.querySelectorAll('img'));
        var classStringCounts = {};

        imgElements.forEach(img => {
            var classString = Array.from(img.classList).join(' ');

            // Count occurrences of each concatenated class string
            classStringCounts[classString] = (classStringCounts[classString] || 0) + 1;
        });

        // Find the concatenated class string with the highest count
        var mostFrequentClassString = Object.keys(classStringCounts).reduce((a, b) => classStringCounts[a] > classStringCounts[b] ? a : b);
        if (mostFrequentClassString.length > 3) {
            return Array.from(document.querySelectorAll(mostFrequentClassString.split(' ').map(m => '.' + m).join(''))).map(m => m.src)
        } else {
            return Array.from(document.querySelectorAll('img')).map(m => m.src)
        }


    })

}
