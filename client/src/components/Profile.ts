import BaseComponent from './BaseComponent';
import profileService from '../../services/ProfileService';

const SAVE_PROFILE_CALSS_NAME = 'save-profile';

export default class Profile extends BaseComponent {
    constructor() {
        super();

        this.element
            .getElementsByClassName(SAVE_PROFILE_CALSS_NAME)[0]
            .addEventListener('click', this.onSave.bind(this));
    }

    protected getTemplate(): string {
        const name = profileService.getProfileName();
        return `
            <div>
                <label><input value="${name}">My Profile Name</label>
                <button class=${SAVE_PROFILE_CALSS_NAME}>Save</button>
            </div>
        `;
    }

    private onSave(): void {
        const name = this.element.getElementsByTagName('input')[0].value;

        if (name) {
            profileService.setProfileName(name);
        }
    }
}
