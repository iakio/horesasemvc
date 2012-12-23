'use strict';

describe("myApp", function () {

  describe("initial", function () {
    beforeEach(function (){
      browser().navigateTo('../../index.html');
    });

    it("should display 3 meigens", function () {
      expect(repeater('.thumbnails li').count()).toBe(3);
    });

    it("should display hero-unit", function () {
      expect(element(".hero-unit:visible").count()).toBe(1);
    });

    it("should not display hit count", function () {
      expect(element(".hit-count:visible").count()).toBe(0);
    });
  });
});
