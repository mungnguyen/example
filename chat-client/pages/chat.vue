<template>
  <div class="chat">
    <div>
      <center>
        <h2>Welcom chat room</h2>
      </center>
    </div>
    <v-row>
      <v-col cols="3">
        <v-list color="yellow">
          <v-subheader>PROJECT</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, index) in projectList"
              :key="index"
              @click="openChatRoom(item, 'project')"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-subheader>PROCEDURAL TASK</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, index) in proceduralList"
              :key="index"
              @click="openChatRoom(item, 'procedural')"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-subheader>RECURRENT TASK</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, index) in recurrentList"
              :key="index"
              @click="openChatRoom(item, 'recurrent')"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-subheader>DEPARTMENT</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item @click="openChatRoom(department, 'department')">
              <v-list-item-content>
                <v-list-item-title v-text="department.depart_name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col cols="9" class="room-detail">
        <v-card class="room-header">{{ room.name }}</v-card>

        <v-row v-if="Object.keys(room).length !== 0" class="room-body">
          <v-col cols="8">
            <div class="message">
              <div v-for="(message, inx) in messageList" :key="inx" class="container">
                <div
                  :class="checkClientMessage(message.id) ? 'message-content message-right':'message-content'"
                >
                  <v-tooltip top dark>
                    <template v-slot:activator="{ on }">
                      <v-avatar color="#fab" size="40" v-on="on">
                        <span class="white--text headline">{{ getIntinizalName(message.author) }}</span>
                      </v-avatar>
                    </template>
                    <span>{{message.author}}</span>
                  </v-tooltip>

                  <div
                    :class="checkClientMessage(message.id) ? 'ownBubble own' : 'otherBubble other'"
                  >{{message.text}}</div>
                </div>
                <span
                  :class="checkClientMessage(message.id) ? 'own' : 'other'"
                >{{ new Date(message.time).toLocaleString()}}</span>
              </div>
            </div>
            <div class="message-menu">
              <v-bottom-navigation color="deep-purple accent-4">
                <v-avatar color="#fab" size="40" :style="{marginTop: '2%'}">
                  <span class="white--text headline">{{getIntinizalName(getName()) }}</span>
                </v-avatar>

                <v-text-field v-model="message" color="purple darken-2" shaped outlined>
                  <template slot="append">
                    <v-btn
                      color="blue"
                      icon
                      max-width="30px"
                      min-width="30px"
                      @click="handleSendMessage"
                    >
                      <v-icon color="blue">mdi-send</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-bottom-navigation>
            </div>
          </v-col>

          <v-col cols="4">
            <ProjectInfo :room="room" />
          </v-col>
        </v-row>

        <v-row v-else>
          <div style="width: 100%; margin-top: 5em">
            <center>
              <h2>Xin chào {{getName()}}!</h2>
              <p>Vui lòng chọn hội thoại bên phải để bắt đầu trò truyện</p>
            </center>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectInfo from "../components/ProjectInfo";

export default {
  components: {
    ProjectInfo
  },

  data() {
    return {
      room: {},
      message: "",
      groupId: "",
      type: "",
      connection: ""
    };
  },

  computed: {
    ...mapState("room", ["roomList"]),
    ...mapState("login", ["user"]),
    ...mapState("project", ["projectList"]),
    ...mapState("proceduralTask", ["proceduralList"]),
    ...mapState("recurrentTask", ["recurrentList"]),
    ...mapState("message", ["messageList"]),
    ...mapState("department", ["department"])
  },

  async asyncData({ store }) {
    try {
      const userId = sessionStorage.getItem("id");
      await Promise.all([
        // store.dispatch("room/getAllRoom", userId),
        store.dispatch("project/getProjectListByUserId", userId),
        store.dispatch("proceduralTask/getProceduralListByUserId", userId),
        store.dispatch("recurrentTask/getRecurrentListByUserId", userId),
        store.dispatch("department/getDepartmentByUserId", userId)
      ]);
    } catch (err) {
      console.log("chat-asyncData", err);
    }
  },

  async created() {
    const userId = sessionStorage.getItem("id");
    console.log("ser", userId);

    if (
      !this.projectList.length ||
      !this.proceduralList.length ||
      !this.recurrentList.length ||
      !this.department.depart_name
    ) {
      await Promise.all([
        this.getProjectListByUserId(userId),
        this.getProceduralListByUserId(userId),
        this.getRecurrentListByUserId(userId),
        this.getDepartmentByUserId(userId)
      ]);
    }
  },

  mounted() {
    const websocketUrl = "ws://13.67.61.152:1337";
    // var websocketUrl = 'ws://localhost:1337'
    const connection = new WebSocket(websocketUrl);
    console.log("cont", connection.readyState);
    this.connection = connection;

    connection.onopen = function() {
      console.log("Open");
      // input.removeAttr("disabled");
      var name = sessionStorage.name;
      var id = sessionStorage.id;
      connection.send(JSON.stringify({ name: name, id: id }));
      console.log(JSON.stringify({ name: name, id: id }));
    };

    connection.onerror = function(error) {
      console.log("Error");
    };

    // most important part - incoming messages
    const _this = this;
    connection.onmessage = function(message) {
      console.log(message);
      console.log(_this.addMessage);
      _this.addMessage(message.data);
      try {
        var json = JSON.parse(message.data);
        console.log(json);
      } catch (e) {
        console.log("This doesn't look like a valid JSON: ", message.data);
        return;
      }

      // NOTE: if you're not sure about the JSON structure
      // check the server source code above
      if (json.type === "color") {
        // first response from the server with user's color
        // myColor = json.data;
        console.log(myName);
        // status.text(myName + ': ').css('color', myColor);
        // input.removeAttr('disabled').focus();
        // from now user can start sending messages
      } else if (json.type === "history") {
        // entire message history
        // insert every single message to the chat window
        var quizUrl = apiUrl + "/group/" + id_group;
        fetch(quizUrl, {
          mode: "no-cors",
          method: "get"
        })
          .then(function(response) {
            response.text().then(function(text) {
              text = JSON.parse(text);
              console.log(text);
              // for (var i=0; i < text.data.length; i++) {
              // addMessage(text.data[i].author, text.data[i].text,
              //            text.data[i].color, new Date(text.data[i].time), text.data[i].id);
              // }
            });
          })
          .catch(function(err) {
            console.log(err);
          });
        // getMessageIdGroup(1)
        //     .then(res => console.log(res))
        //     .catch(err => {throw  err})
        // for (var i=0; i < json.data.length; i++) {
        //     addMessage(json.data[i].author, json.data[i].text,
        //                json.data[i].color, new Date(json.data[i].time), json.data[i].id);
        // }
      } else if (json.type === "message") {
        console.log(message);
        // it's a single message
        // input.removeAttr('disabled'); // let the user write another message
        // addMessage(json.data.author, json.data.text,
        //            json.data.color, new Date(json.data.time), json.data.id);
      } else {
        console.log("Hmm..., I've never seen JSON like this: ", json);
      }
    };

    console.log("connection1", connection);
  },

  methods: {
    ...mapActions("room", ["getAllRoom"]),
    ...mapActions("project", [
      "getProjectListByUserId",
      "getTaskListByProjectId"
    ]),
    ...mapActions("proceduralTask", ["getProceduralListByUserId"]),
    ...mapActions("recurrentTask", ["getRecurrentListByUserId"]),
    ...mapActions("member", ["getProjectMember", "getDepartmentMember"]),
    ...mapActions("message", ["getMessageListByGroupId", "addMessage"]),
    ...mapActions("department", ["getDepartmentByUserId"]),

    getName() {
      if (process.browser) {
        const userName = sessionStorage.getItem("name");
        console.log("ser", userName);
        return userName;
      }
    },

    getIntinizalName(name) {
      return name
        .split(" ")
        .map(n => n[0].toUpperCase())
        .join("");
    },

    checkClientMessage(id) {
      const userId = sessionStorage.getItem("id");
      console.log("userId", userId);
      return Number(id) == Number(userId);
    },

    openChatRoom(room, type) {
      const _groupList = localStorage.getItem("groupList");
      const groupList = JSON.parse(_groupList);
      console.log("d", groupList.project);
      if (type === "project") {
        this.groupId = groupList.project.find(
          item => item.id_project === room.id
        ).id;
        this.getProjectRoom(room);
      } else if (type === "procedural") {
        this.groupId = groupList.project.find(
          item => item.id_project === room.id
        ).id;
        this.getProceduralRoom(room);
      } else if (type === "recurrent") {
        this.groupId = groupList.project.find(
          item => item.id_project === room.id
        ).id;
        this.getRecurrentRoom(room);
      } else if (type === "department") {
        console.log("room", room._id);
        this.groupId = groupList.department.find(
          item => item.id_project === room._id
        ).id;
        this.getDepartmentRoom(room);
      }
    },

    async getProjectRoom(room) {
      this.room = room;
      console.log("room", room);
      await Promise.all([
        this.getProjectMember(room.id),
        this.getTaskListByProjectId(room.id),
        this.getMessageListByGroupId(this.groupId)
      ]);
    },

    getProceduralRoom(room) {},

    getRecurrentRoom(room) {},

    async getDepartmentRoom(room) {
      await Promise.all([
        this.getDepartmentMember(room._id),
        this.getMessageListByGroupId(this.groupId)
      ]);
    },

    handleSendMessage() {
      console.log("connect", this.connection);
      const _this = this;
      this.connection.send(
        JSON.stringify({
          message: _this.message,
          // id_task: id_task, // id_task là id của task, nếu nó là project thì id_task = -1, nếu nó là recurrent thì id_task = -2, nếu nó là department thì id_task = -3
          // id_project: id_project, //id_project là id của project, recurrent, department, nếu nó là task thì phải truyền vào id_project = "",
          // 2 trường id_task và id_project buộc phải truyền vào
          id_group: _this.groupId
        })
      );
      this.message = "";
    }
  }
};
</script>

<style lang="scss" scope>
html {
  height: 100%;
  body {
    height: 100%;
  }
}
#__nuxt {
  height: 100%;
}

#__layout {
  height: 100%;
}

.chat-client {
  height: 100%;
}

.chat {
  height: 100%;
  div {
    h2 {
      height: 5%;
    }
  }
  .row {
    height: 95%;
    .col {
      padding: 0;
      height: 100%;
      border: solid 0.5px rgba(0, 0, 0, 0.12);
    }
  }

  .room-detail {
    padding: 0;

    .v-avatar {
      object-fit: contain;
    }

    .room-header {
      height: 10%;
    }

    .room-body {
      margin: 0;
      height: 90%;
      .message {
        position: relative;
        overflow: auto;
        .container {
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          align-self: flex-end;
          .message-content {
            display: inline-flex;
          }

          .message-content.message-right {
            flex-direction: row-reverse;
            color: #fff;
          }

          .ownBubble {
            min-width: 60px;
            max-width: 700px;
            padding: 0.61em;
            margin: 2px;
            background-color: blue;
            border-radius: 16px 16px 0 16px;
            border: 1px solid rgb(56, 56, 165);
          }
          .otherBubble {
            min-width: 60px;
            max-width: 700px;
            padding: 0.6em;
            margin: 2px;
            background-color: #f1f0f0;
            border-radius: 16px 16px 16px 0;
            border: 1px solid #dfdfdf;
          }
          .own {
            align-self: flex-end;
          }
          .other {
            align-self: flex-start;
          }
          span.own,
          span.other {
            font-size: 14px;
            color: grey;
          }
        }
        height: 90%;
        border: solid 0.5px rgba(0, 0, 0, 0.12);
      }

      .message-menu {
        height: 10%;
        border: solid 0.5px rgba(0, 0, 0, 0.12);

        .v-text-field {
          border-radius: 50px;
          margin-left: 0.5em;
          fieldset {
            height: 80%;
            margin: 1.5% 0;
          }
        }
      }
    }
  }
}
</style>>