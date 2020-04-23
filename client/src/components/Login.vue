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
            <span>Username is required!</span>
        </md-snackbar>
    </div>
</template>

<script>
import { getUsername, setUsername } from '../services/local-storage-service';
import router from '../router';
import Pages from '../constants/pages';

export default {
  name: 'Login',
  data: () => {
    return {
        username: getUsername(),
        showSnackbar: false
    };
  },
  methods: {
    saveUsername() {
        if (this.username) {
            setUsername(this.username);
            this.redirect();
        } else {
            this.showSnackbar = true;
        }
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
