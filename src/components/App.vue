<template>
  <div class="columns is-mobile is-desktop m-0 p-0" style="height: 100%;">
    <div class="column is-2 is-sidebar-menu has-background-primary p-0 m-0">
      <aside class="menu" style="height: 100%;">
        
        
        <div class="user has-background-secondary" style="height: 15%;">
            <!-- dados do usuário -->
          <div v-if="user">
            <div id="me" class="columns is-mobile pl-4 pt-4">
                <div class="column is-12-mobile is-3-desktop p-0 py-3">
                    <h1 class="has-text-white is-size-4 has-text-centered is-fullwidth tag-me p-1">{{ user.nome.charAt(0).toUpperCase() }}</h1>
                </div>
                <div class="column is-9 is-hidden-mobile">
                    <p class="has-text-left has-text-white">{{ user.nome }}</p>
                    <p class="has-text-light is-size-7 has-text-left">@{{ user.slug }}</p>
                </div>
            </div>
          </div>

        </div>


        <p class="p-2 has-text-success" style="height: 7%;">Usuários Online:</p>
        <list-contato @clicou="alterarConversa" :slugUser="user.slug">
          <!-- lista de usuarios online -->
        </list-contato>

        
        <div class="btns has-background-secondary">
          <!-- assinatura -->
        </div>

      </aside>
    </div>

    <chat-window>
      <!-- mensagens -->
    </chat-window>
    

  </div>
</template>

<script>

import listContato from "./ListContato.vue";
import chatWindow from "./ChatWindow.vue";

export default {

  created(){
    db.collection('usuarios').doc(this.keyUser).get().then(snapshot => {
      if(snapshot.exists) {
        
        this.user = snapshot.data();

        db.collection('mensagens')
        .where('from', '==', this.user.slug)
        .get().then(snap => {
          snap.docs.forEach(mess => this.messagesFrom.push(mess.data()));
        })

        db.collection('mensagens')
        .where('to', '==', this.user.slug)
        .onSnapshot(snap => {
          let dc = snap.docChanges();
          dc.forEach(ch => {
            this.messagesTo.push(ch.doc.data());
            if(ch.doc.data().from == this.contatoSlug) {
              this.$root.$emit('nova_mensagem', ch.doc.data());
            } else {
              // TODO: envia um alerta de nova mensagem
            }
          })
        })

      } else {
        this.keyUser = "";
        /// TODO: deletar cookie
      } 
    });
    
    

  },

  name: 'app',

  props:{
    keyUser: String
  },

  components:{
    'list-contato':listContato,
    'chat-window': chatWindow
  },
  
  data () {
    return {
      contatoSlug:null,
      user:{},
      messagesFrom:[],
      messagesTo:[]
    }
  },

  methods: {

    alterarConversa(contato){
      /// metodo para alterar a visualização de conversa
      /// Ativa o metodo em ChatWindow.vue
      let listMessages = [];
      
      this.messagesFrom.forEach(el => {
        if(el.to == contato.slug) listMessages.push(el)
      })
      this.messagesTo.forEach(el => {
        if(el.from == contato.slug) listMessages.push(el)
      })

      listMessages.sort((a,b) => (a.dia > b.dia) ? 1 : ((b.dia > a.dia) ? -1 : 0));

      console.log(listMessages);

      this.contatoSlug = contato.slug;
      this.$root.$emit('ativar_conversa', contato, listMessages);
      
    }

  }

}
</script>

<style>

.btns {
  height: 8%;
}

::-webkit-scrollbar-track {
    background-color: #32465a;
}

::-webkit-scrollbar {
    width: 6px;
    background: #243140;
}
::-webkit-scrollbar-thumb {
    background: #243140;
}

.tag-me {
  border-radius: 200px;
  border: 1px solid white;
}

</style>
