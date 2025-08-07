<template>
    <div>
        <div class="teams-user-list my-4">
            <p v-if="$root.teamsUserList.length === 0">
                {{ $t("Not available, please setup.") }}
            </p>
            <ul v-else class="list-group mb-3" style="border-radius: 1rem;">
                <li v-for="(user, index) in $root.teamsUserList" :key="index" class="list-group-item">
                    {{ user.name }} ({{ user.id }})<br>
                    <a href="#" @click="$refs.userDialog.show(index)">{{ $t("Edit") }}</a>
                </li>
            </ul>
            <button class="btn btn-primary" type="button" @click="$refs.userDialog.show()">
                {{ $t("Add Teams User") }}
            </button>
        </div>
        <TeamsUserDialog ref="userDialog" />
    </div>
</template>

<script>
import TeamsUserDialog from "../../components/TeamsUserDialog.vue";

export default {
    components: {
        TeamsUserDialog
    }
};
</script>

<style scoped>
@import "../../assets/vars.scss";

.dark {
    .list-group-item {
        background-color: $dark-bg2;
        color: $dark-font-color;
    }
}
</style>
