<template>
    <md-card :class="cardClassName" md-with-hover>
        <md-ripple>
            <md-card-header>
                <div class="md-title">{{ username || "Free slot" }}</div>
                <div class="md-subhead">With hover and ripple effects</div>
            </md-card-header>

            <md-card-content>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque
                ea, nostrum odio. Dolores, sed accusantium quasi non.
            </md-card-content>

            <md-card-actions>
                <md-button>Action</md-button>
                <md-button>Action</md-button>
            </md-card-actions>
        </md-ripple>
    </md-card>
</template>

<script>
import './player-card.scss';

export default {
    name: "PlayerCard",
    props: {
        username: String
    },
    computed: {
        cardClassName() {
            return {
                'empty-card': !this.username,
                'md-accent': this.username,
            };
        }
    }
};
</script>
