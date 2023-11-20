export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameSelector = document.querySelector(nameSelector);
        this._jobSelector = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            nameSelector: this._nameSelector.textContent,
            jobSelector: this._jobSelector.textContent
        }
    }

    setUserInfo(data) {
        this._nameSelector.textContent = data.name_input;
        this._jobSelector.textContent = data.job_input;
    }
}