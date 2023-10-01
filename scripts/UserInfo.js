export default class UserInfo {
    constructor(nameSelector, descriptionSelector ) {
        this.nameElement = document.querySelector(nameSelector).textContent;
        this.descriptionElement = document.querySelector(descriptionSelector).textContent;
    }

    getUserInfo() {
        return [this.nameElement, this.descriptionElement];
    }

    setUserInfo(nameElement, descriptionElement) {
        document.querySelector('.profile__username').textContent = nameElement;
        document.querySelector('.profile__description').textContent = descriptionElement;
        this.nameElement = nameElement;
        this.descriptionElement = descriptionElement;
    }
}

