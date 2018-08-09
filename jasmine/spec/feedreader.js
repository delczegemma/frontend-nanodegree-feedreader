/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* First test about the RSS Feed,
         * If there is an array existed and contains at least
         * one element
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URLs exist',function(){
            for(const feed of allFeeds){
                expect(feed.url).toBeTruthy();
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names exist',function(){
            for(const feed of allFeeds){
                expect(feed.name).toBeTruthy();
            }
        })
    });


    /* A test suite, that contains expectations about the menu */

    describe('The menu',function() {
        /* A test that ensures the menu element is
         * hidden by default. Te menu goes offscreen
         * with the transform transition,
         * if it goes to the direction,
         * where it poistioned (in this case to the left),
         * and goes at least thet wide,
         * which it's width is. The jQuery outerWith() selector
         * counts padding and potential border side to the element's width.
         * This test checks, if that width would be smaller
         * than the transition along the x coordinate.
         * The latter coordinate we get from splitting the matrix String,
         * which is the .css('transform') return value.
         */
         let slideMenu = $('.slide-menu')

         it('is hidden by default',function() {
            let transX = Number.parseFloat(slideMenu.css('transform').split(', ')[4]);
            let realWidth = slideMenu.outerWidth();
            /* transX <= -realWidth */
            expect(transX).not.toBeGreaterThan(-realWidth);
            expect($("body").hasClass("menu-hidden")).toBe(true);
         });
        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
         it('changes visibility when clicked', function(){
            /* If there is no such class selector,
             * this jQuery function retuns an empty array
             */

            $('.menu-icon-link').click();
            /* ensure that body does not have class menu-hidden */
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            /* body should have class menu-hidden */
            expect($('body').hasClass('menu-hidden')).toBe(true);
         })
    });

    /* A test suite, that contains expectations about feed entries */
    describe('Initial Entries',function(){

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * It is an asycronous function, so it luads the feed first and then
         * checks the expectation.
         */

        beforeEach(function(done){
            loadFeed(0, done);
        });

         it('exist after feed loading',function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
         })
    })


    /* A test suite, that contains expectations about
     * feed contents after loading the feed.
     */
    describe('New Feed Selection',function(){
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * First we are using the loadFeed function for width the parameter
         * indexing the first feed elemnt in the array. We save its content
         * and have run the loadFeed again with the second feedElement. Only if
         * this function is done, we check, if the new and the old content
         * are not the same.
         */
         let oldCont;
         beforeEach(function(done){
            loadFeed(0, function(){
                oldCont = $('.feed').text();
                loadFeed(1, done);
            });
        });

        it('content changes after new feed loaded', function(){
            let newCont = $('.feed').text();
            expect(oldCont).not.toEqual(newCont);
        })

    })

}());