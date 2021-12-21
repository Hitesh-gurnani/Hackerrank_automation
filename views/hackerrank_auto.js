const puppeteer = require('puppeteer');
const loginLink = 'https://www.hackerrank.com/auth/login';
const signup = 'https://www.hackerrank.com/auth/signup';
const email = 'bohit75676@ztymm.com'
const password = 'trytrytry'
const codes = require('./code')
let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
})
let page
browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise
}).then(function (newTab) {
    page = newTab
    let HackerrankPromise = newTab.goto(loginLink)
    return HackerrankPromise
}).then(function () {
    let emailEntered = page.type("input[id='input-1']", email, { delay: 50 })
    return emailEntered
}).then(function () {
    let passwordinEnter = page.type("input[type='password']", password, { delay: 50 })
    return passwordinEnter
}).then(function () {
    let LoginClickedpromise = page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return LoginClickedpromise
}).then(function () {
    let algoPromise = WaitandClick('.topic-card a[data-attr1="algorithms"]', page)
    return algoPromise
}).then(function () {
    let warmupreached = WaitandClick('input[value="warmup"]', page)
    return warmupreached
}).then(function () {
    // let questiontobesolvedPromise=WaitandClick('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled',apge);
    let allquestions = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-styled');
    return allquestions
}).then(function (questionarray) {
    console.log(questionarray.length);
    let questionstobeSolvedpromise = questionSolver(questionarray[0], page, codes.answer[0]);
    return questionstobeSolvedpromise;
})


function WaitandClick(selector, current_page) {
    return new Promise(function (resolve, reject) {
        let waitforselectortoloadPromise = current_page.waitForSelector(selector)
        waitforselectortoloadPromise.then(function () {
            let clickModal = current_page.click(selector)
            return clickModal
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        })
    })
}

function questionSolver(question, page, ans) {
    return new Promise(function (resolve, reject) {
        let questionPromise = question.click()
        questionPromise.then(function () {
            return WaitandClick('.checkbox-input', page)
        }).then(function () {
            return page.type('.input-wrap', ans, { delay: 10 })
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed
        }).then(function () {
            let Aispressed = page.keyboard.press('A', { delay: 100 });
            return Aispressed
        }).then(function () {
            let Xispressed = page.keyboard.press('X', { delay: 100 });
            return Xispressed
        }).then(function () {
            let ctrlIsunPressed = page.keyboard.up('Control');
            return ctrlIsunPressed
        }).then(function () {
            let maineditorinfocus = WaitandClick('.monaco-editor.no-user-select.vs ', page);
            return maineditorinfocus
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed
        }).then(function () {
            let Aispressed = page.keyboard.press('A', { delay: 100 });
            return Aispressed
        }).then(function () {
            let Vispressed = page.keyboard.press('V', { delay: 100 });
            return Vispressed
        }).then(function () {
            let submitispressed = WaitandClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', page);
            return submitispressed
        }).then(function (browserObj) {
            let browserOpenPromise = browserObj.newPage()
            return browserOpenPromise
        }).then(function (newTab) {
            let thankyouPromise = newTab.goto(thanklink)
            return thankyouPromise
        })
    })
}
