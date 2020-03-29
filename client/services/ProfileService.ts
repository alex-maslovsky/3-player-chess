const PROFILE_NAME_KEY = 'profile-name';

class ProfileService {
    getProfileName(): string {
        return localStorage.getItem(PROFILE_NAME_KEY);
    }

    setProfileName(name: string): void {
        localStorage.setItem(PROFILE_NAME_KEY, name);
    }
}

export default new ProfileService();
