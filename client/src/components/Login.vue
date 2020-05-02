<template>
    <div class="md-layout">
        <div class="md-layout-item"></div>
        <div class="md-layout-item md-layout md-size-67">
            <div class="md-layout-item">
                <md-field :class="validationClass">
                    <label>Username</label>
                    <md-input v-model="username"></md-input>
                </md-field>
            </div>
            <div class="md-layout-item md-size-33" style="display: flex; align-items: center;">
                <md-button class="md-raised md-primary" @click="saveUsername()" style="width: 100%;">Save</md-button>
            </div>
        </div>
        <div class="md-layout-item"></div>
        <md-snackbar md-position="center" :md-duration="2000" :md-active.sync="showSnackbar" md-persistent>
            <span v-if="username">Username already exists!</span>
            <span v-else>Username is required!</span>
        </md-snackbar>
    </div>
</template>

<script>
import { setToken } from '../services/local-storage-service';
import router from '../router';
import Pages from '../constants/pages';
import { login } from '../services/user-socket-service';
import userStrore from '../stores/user-store';

export default {
  name: 'Login',
  data: () => {
    return {
        username: userStrore.username,
        showSnackbar: false
    };
  },
  methods: {
    async saveUsername() {

        if (this.username) {
            const { token, username } = await login(this.username);

            if (token) {
                setToken(token);
                userStrore.username = username;
                this.redirect();

                return;
            }
        }

        this.showSnackbar = true;
    },
    redirect() {
        router.push(router.currentRoute.query.backUrl || { name: Pages.Home });
    }
  },
  computed: {
    validationClass() {
        return {
            'md-invalid': !this.username
        };
    }
  }
};
</script>
