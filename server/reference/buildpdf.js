// this file should take a uuid and create the proper pdf form from the html dump;
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const createBufferFromPdfFile = async (uuid) => {
    let content, browser, page, buffer;

    try {
        console.log(`using uuid: ${uuid}, creating buffer`);
        content = fs.readFileSync(path.resolve(__dirname, `../prHtml/pr_form_${uuid}.html`), 'utf-8');
        console.log('we have buffer')
    } catch (error) {
        console.log(error)
        return null;
    }

    try {
        console.log('open browser');
        browser = await puppeteer.launch({ headless: true });
    } catch (error) {
        console.log('failed browser', error);
    }

    try {
        console.log('open a new page and navigate to content')
        page = await browser.newPage();
        await page.setContent(content);
    } catch (error) {
        console.log(`error set content ${error}`)
    }
    

    try {
        console.log('trying to make pdf buffer')        
        buffer = await page.pdf({
            printBackground: true,
            margin: {
            left: "0px",
            top: "0px",
            right: "0px",
            bottom: "0px"
            } 
        })
    } catch (error) {
        console.log('error making pdf from buffer', error)
    }

    // this is experimental code
    console.log(`close the browser`)
    await browser.close();

    return buffer;
    

    // // console.log(`buffer: ${buffer}`)
    // console.log('close the browser')
    // await browser.close();

    // try {
    //     console.log(`creating pdf with uuid ${uuid}`)

    //     fs.mkdir(path.resolve(__dirname, '../printedPR'), () => {
    //         console.log('made dir')
    //         fs.writeFile(path.resolve(__dirname,`../printedPR/${uuid}.pdf`), buffer, 'base64', () => {
    //             console.log('callback')
    //         })
    //     });
    //     console.log(`success ${uuid}`)

    //     return path.resolve(__dirname, `../printedPR/pr_${uuid}.pdf`);
    // } catch (error) {
    //     console.log(`Error making the pdf ${uuid}`)
    //     return error
    // }
};



module.exports = {
    createBufferFromPdfFile,
}