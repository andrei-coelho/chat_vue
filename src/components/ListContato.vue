<template>
  <ul class="menu-list" style="height: 70%; overflow-y:auto; overflow-x:hidden; border-top: 1px solid #435f7a;">
    <li ref="listUsers" v-for="(contato, index) in contatos" :key="index">
      <a v-on:click="enviarDadosAoPai(index)" class="button is-primary " style="height: 70px;">
        <div id="dataContact" class="columns is-mobile">
          <div class="column is-12-mobile is-3-desktop p-0 py-3">
            <h1 class="is-size-4 has-text-centered is-fullwidth tag-name p-1">{{ contato.nome.charAt(0).toUpperCase() }}</h1>
          </div>
          <div class="column is-9 is-hidden-mobile">
            <p class="has-text-left">{{ contato.nome }}</p>
            <p class="has-text-light is-size-7 has-text-left">@{{ contato.slug }}</p>
          </div>
        </div>
      </a>
    </li>
  </ul>   
</template>

<script>

export default {

  name: 'listContato',

  created(){
    db.collection('usuarios')
    .where('slug', '!=', this.slugUser).get().then(snap => {
      snap.docs.forEach(user => {
        this.contatos.push(user.data());
      });
    });
  },
  
  props:{
    slugUser:String
  },

  data () {
    return {
      contatos: [],
      elClicked: null
    };
  },

  methods:{
    enviarDadosAoPai(index) {

        if(this.elClicked) {
          this.elClicked.classList.remove('contact-selected');
        }

        this.elClicked = this.$refs.listUsers[index].children[0];
        this.elClicked.classList.add('contact-selected');
        this.$emit('clicou', this.contatos[index]);
        
    }
  },

  computed: {
    
  }


}

</script>

<style>

  .contact-selected {
    background-color: #243140 !important;
  }

  .tag-name {
    border-radius: 200px;
    border: 1px solid #435f7a;
  }

  #dataContact {
      border-bottom: 1px solid #435f7a;
  }

</style>