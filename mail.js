const puppeteer = require('puppeteer');
const fs = require('fs');
const cFile = process.argv[2];
let uname, pass;
let url, sent_email
let subject, filepath
let message, count
(async () => {
    try {
        let contents = await fs.promises.readFile(cFile);
        let credentials = JSON.parse(contents)
        uname = credentials.email;
        pass = credentials.password;
        url = credentials.url;
        sent_email = credentials.sentemail;
        filepath = credentials.filepath;
        message = credentials.message;
        subject = credentials.subject;
        count = credentials.count
        // launch browser 
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--incognito", "--start-maximized", "--disable-notifications"]
        });
        // set the initially page or main page.
        const pages = await browser.pages();
        let page = pages[0];
        await is_login_On_Outlook(page);
        await get_mail(page);
        await send_mail(page);
        //await page.close();
        console.log('Tasks Completed')
    } catch (err) {
        console.log('Tasks IN_Completed')
        console.log(err)
    }
})()

async function is_login_On_Outlook(page) {
    try {
        await page.goto(url, {
            waitUntil: "networkidle0"
        });
        await page.evaluate(() => {
            document.querySelectorAll('.auxiliary-actions ul li a')[1].click()
        })
        //type="email"
        await page.waitForSelector('input[type="email"]', {
            visible: true
        })
        await page.type('input[type="email"]', uname, {
            delay: 120
        })
        //document.querySelector('input[type="submit"]').click()
        await page.evaluate(() => {
            document.querySelector('input[type="submit"]').click()
        })
        //type="password"
        await page.waitForSelector('input[type="password"]', {
            visible: true
        })
        await page.type('input[type="password"]', pass, {
            delay: 120
        })
        await page.evaluate(() => {
            document.querySelector('input[name="KMSI"]').click()
        })
        await Promise.all([page.waitForNavigation({
                waitUntil: "networkidle0",
            }),
            page.click('.btn.btn-block.btn-primary')
        ])
        await page.waitForSelector('input[type="password"]', {
            visible: true
        })
        await page.type('input[type="password"]', pass, {
            delay: 120
        })
        await page.evaluate(() => {
            document.querySelector('input[name="KMSI"]').click()
        })
        await Promise.all([page.waitForNavigation({
                waitUntil: "networkidle0",
            }),
            page.click('.btn.btn-block.btn-primary')
        ])

        console.log("LOGIN_Complete");
    } catch (err) {
        console.log('LOGIN---IN_Complete')
        console.log(err)
    }
}
async function get_mail(page) {
    try {
        await page.waitForNavigation({
            waitUntil: 'networkidle2',
            wait: 3000
        })
        await page.waitForSelector('div[aria-label="Message list"] div._3Cyb5RCzk-gWPlpiAoHEXR div.laGnUXZu6QC88ONZDEBcE >div[role="listbox"] div.BVgxayg_IGpXi5g7S77GK > div[role="option"]', {
            visible: true
        })

        let mails = await page.$$('div[aria-label="Message list"] div._3Cyb5RCzk-gWPlpiAoHEXR div.laGnUXZu6QC88ONZDEBcE >div[role="listbox"] div.BVgxayg_IGpXi5g7S77GK > div[role="option"]')
        for (let i = 0; i < count; i++) {
            let item = await mails[i].$('._2miAFnGHXlWwulyUmLEbzZ div');
            await item.click({
                delay: 100
            });


            await Mail_list_Creation(i, page)

        }
    } catch (err) {
        console.log(err)
    }
}
async function send_mail(page) {
    try {
        await page.waitForSelector('.qtRcagoPZ5dw3xsr114ze > button', {
            visible: true
        })
        await page.evaluate(() => {
            document.querySelector('.qtRcagoPZ5dw3xsr114ze > button').click()
        })

        await page.waitForSelector('input[role="combobox"]', {
            visible: true
        })
        await page.type('input[role="combobox"]', sent_email, {
            delay: 120
        })

        await page.waitForSelector('._1ZvO88uWQ0gTHWiljSqFgv', {
            visible: true
        })
        await page.click('._1ZvO88uWQ0gTHWiljSqFgv')

        await page.type('input[type="text"]', subject, {
            delay: 120
        })
        await page.click('button[name="Attach"]')

        const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            page.click('button[name="Browse this computer"]')
        ])

        await fileChooser.accept([filepath]);

        await page.type('div[aria-label="Message body"]', message, {
            delay: 200
        })
        // await Promise.all([page.waitForNavigation({
        //         waitUntil: "networkidle0",
        //     }),

        // ])
        page.click('button[title="Send (Ctrl+Enter)"]', {
            delay: 200
        })

        console.log("Mail-Send_Complete");


    } catch (err) {
        console.log('Mail-Send_IN_Complete')
    }
}
async function Mail_list_Creation(i, page) {
    try {
        // const name = await mails[3].$eval('._1Cz6QWtbduTKlAyf910p0h', el => el.innerText)
        // console.log(innerText)
        await page.waitForSelector('.B1IVVpQay0rPzznhParFr.KcNy0Xfd9-is-_CEp3QOI', {
            visible: true
        })
        const innerText = await page.$eval('.B1IVVpQay0rPzznhParFr.KcNy0Xfd9-is-_CEp3QOI', el => el.innerHTML)
        // console.log(innerText)
        fs.writeFileSync(`${i+1}-Mail.HTML`, innerText);

        console.log(`File ${i+1} Completed`)

    } catch (err) {
        console.log("Mail-File_IN_complete")
        console.log(err)
    }
}
