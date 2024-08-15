$(document).ready(function() {
    // Initial setup: add 'activo' class to the first link and show the first article
    $('ul.cases li a:first').addClass('activo');
    $('.pages2 article').hide();
    $('.pages2 article:first').show();

    // Event handler for link clicks
    $('ul.cases li a').on('click', function(event) {
        event.preventDefault();

        // Remove multiple classes from all links
        $('ul.cases li a').removeClass('activo active_2 active_3 activo_green activo_red');

        // Get the href attribute of the clicked link
        var activeTab = $(this).attr('href');
        console.log(activeTab);

        // Add different styles based on the href attribute
        if (activeTab === '#page1') {
            $(this).addClass('activo');
        } else if (activeTab === '#page2') {
            $(this).addClass('activo_red');
        } else if (activeTab === '#page3') {
            $(this).addClass('activo_green');
        }

        // Hide all articles and show the corresponding article
        $('.pages2 article').hide();
        $(activeTab).show();
    });

    // Smooth scroll for list items
    document.querySelectorAll('.cases li a').forEach(item => {
        item.addEventListener('click', event => {
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;

                    window.scroll({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    console.error(`Element with ID ${targetId} not found.`);
                }
            } else {
                console.error('data-target attribute not found on the clicked element.');
            }
        });
    });
});
