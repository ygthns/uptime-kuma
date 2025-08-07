<template>
    <form @submit.prevent="submit">
        <div ref="modal" class="modal fade" tabindex="-1" data-bs-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t("Teams Mention User") }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="teams-user-name" class="form-label">{{ $t("Name") }}</label>
                            <input id="teams-user-name" v-model="user.name" type="text" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="teams-user-id" class="form-label">{{ $t("ID") }}</label>
                            <input id="teams-user-id" v-model="user.id" type="text" class="form-control" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-if="index !== null" type="button" class="btn btn-danger" :disabled="processing" @click="deleteConfirm">{{ $t("Delete") }}</button>
                        <button type="submit" class="btn btn-primary" :disabled="processing">
                            <div v-if="processing" class="spinner-border spinner-border-sm me-1"></div>
                            {{ $t("Save") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <Confirm ref="confirmDelete" btn-style="btn-danger" :yes-text="$t('Yes')" :no-text="$t('No')" @yes="deleteUser">
        {{ $t("deleteTeamsUserMsg") }}
    </Confirm>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import Confirm from "./Confirm.vue";

export default {
    components: { Confirm },
    data() {
        return {
            modal: null as any,
            processing: false,
            index: null as number | null,
            user: {
                name: "",
                id: "",
            }
        };
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal as any);
    },
    beforeUnmount() {
        this.cleanupModal();
    },
    methods: {
        show(index?: number) {
            if (index !== undefined && index !== null) {
                this.index = index;
                this.user = { ...this.$root.teamsUserList[index] };
            } else {
                this.index = null;
                this.user = {
                    name: "",
                    id: "",
                };
            }
            this.modal.show();
        },
        submit() {
            this.processing = true;
            this.$root.getSocket().emit("addTeamsUser", this.user, this.index, (res) => {
                this.$root.toastRes(res);
                this.processing = false;
                if (res.ok) {
                    this.modal.hide();
                }
            });
        },
        deleteConfirm() {
            this.modal.hide();
            (this.$refs.confirmDelete as any).show();
        },
        deleteUser() {
            this.processing = true;
            this.$root.getSocket().emit("deleteTeamsUser", this.index, (res) => {
                this.$root.toastRes(res);
                this.processing = false;
                if (res.ok) {
                    (this.$refs.confirmDelete as any).hide();
                }
            });
        },
        cleanupModal() {
            if (this.modal) {
                this.modal.hide();
                this.modal.dispose();
                this.modal = null;
            }
        }
    }
};
</script>


