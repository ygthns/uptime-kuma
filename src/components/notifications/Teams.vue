<template>
    <div class="mb-3">
        <label for="teams-webhookurl" class="form-label">{{ $t("Webhook URL") }}</label>
        <input
            id="teams-webhookurl"
            v-model="$parent.notification.webhookUrl"
            type="text"
            class="form-control"
            required
        />
        <i18n-t tag="div" keypath="wayToGetTeamsURL" class="form-text">
            <a
                href="https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook"
                target="_blank"
            >{{ $t("here") }}</a>
        </i18n-t>
    </div>
    <div class="mb-3">
        <label for="teams-mentions" class="form-label">{{ $t("Teams Users") }}</label>
        <select id="teams-mentions" v-model="$parent.notification.mentions" class="form-select" multiple>
            <option v-for="user in $root.teamsUserList" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div class="form-text">{{ $t("Select users to mention in notifications") }}</div>
    </div>
</template>

<script>
export default {
    mounted() {
        if (!this.$parent.notification.mentions) {
            this.$parent.notification.mentions = [];
        }
    }
};
</script>
