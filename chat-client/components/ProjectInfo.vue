<template>
  <div>
    <v-expansion-panels>
      <!-- Member -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>
            <v-icon>mdi-account-supervisor</v-icon>Thành viên
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-for="(item, index) in memberList" :key="index">
            <v-avatar color="#ddd" size="36">
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            {{ item.name }}
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Task List -->
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>
            <v-icon>mdi-format-list-bulleted</v-icon>Danh sách công việc
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-for="(task, index) in taskList" :key="index">
            {{ task.name }}
            <p
              :style="{marginLeft: '1em'}"
              v-for="(member, inx) in task.members"
              :key="inx"
            >{{ memberListObj[member.user_id] }}</p>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    room: Object
  },

  data() {
    return {
      projectMenu: []
    };
  },

  computed: {
    ...mapState("member", ["memberList"]),
    ...mapState("project", ["taskList"]),

    memberListObj() {
      const memberListObj = {};

      this.memberList.forEach(item => {
        memberListObj[item.id] = item.name;
      });

      return memberListObj;
    }
  }
};
</script>