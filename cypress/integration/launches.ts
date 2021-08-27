import getVideoId from "get-video-id";

describe("launches", () => {
  it("should have each launch be a link to the youtube video", () => {
    cy.visit("/");
    cy.findAllByTestId("launch").each((el) => {
      cy.wrap(el)
        .find("a")
        .invoke("attr", "href")
        .then((href) => {
          const { service } = getVideoId(href as string);
          expect(service).to.equal("youtube");
        });
    });
  });

  it("should have the youtube video thumbnail for each launch", () => {
    cy.visit("/");
    cy.findAllByTestId("launch").each((el) => {
      cy.wrap(el)
        .find("img")
        .invoke("attr", "src")
        .should("include", "https://img.youtube.com/vi");
    });
  });

  it("should have the mission, date, site info for each launch", () => {
    cy.visit("/");
    cy.findAllByTestId("launch").each((el) => {
      cy.wrap(el).findByTestId("mission").should("not.be.empty");
      cy.wrap(el).findByTestId("date").should("not.be.empty");
      cy.wrap(el).findByTestId("site").should("not.be.empty");
    });
  });

  it("should filter launches on search", () => {
    cy.visit("/");
    const searchQuery = "Starlink";
    cy.findByTestId("search").type(searchQuery);
    cy.wait(600); // wait to ensure debounce
    cy.findAllByTestId("launch").each((el) => {
      cy.wrap(el)
        .findByTestId("mission")
        .invoke("text")
        .then((text) => {
          expect(text).to.include(searchQuery);
        });
    });
  });
});
