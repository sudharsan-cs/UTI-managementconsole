const puppeteer = require("puppeteer");

const printPdf = async (buildPathHtml) => {
    /** Launch a headleass browser */
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    /* 1- Ccreate a newPage() object. It is created in default browser context. */
    const page = await browser.newPage();
    /* 2- Will open our generated `.html` file in the new Page instance. */
    await page.goto("file://" + buildPathHtml, {
      waitUntil: "networkidle0",
    });
    /* 3- Take a snapshot of the PDF */
    const pdf = await page.pdf({
      format: "A4",
      displayHeaderFooter: true,
      printBackground: true,
      landscape: true,
      headerTemplate: "<div></div>",
      footerTemplate:
        '<div id="footer-template" style="font-family:sans-serif !important; font-weight: 535;  letter-spacing: -0.5px; font-size:8px !important; color:#cacbce; padding-left:30px">' +
        "UTI - Confidential and Proprietary Information" +
        '</span></div><span class="pageNumber"></span><span class="totalPages"></span>',
      margin: {
        top: "50px",
        bottom: "50px",
        right: "0px",
        left: "0px",
      },
    });
    /* 4- Cleanup: close browser. */
    await browser.close();
    return pdf;
  };
  
  module.exports = {
    printPdf
  };