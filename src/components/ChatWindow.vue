<template>
    <div class="column has-background-clean m-0 pt-0 px-0">

        <div v-if="contato" class="user-info has-background-white p-2" style="height: 12%;">
            <div id="dataContact" class="columns" style="border:none;">
                <div class="column is-1 p-0 py-3 px-3 is-hidden-mobile">
                    <h1 class="is-size-4 has-text-centered is-fullwidth tag-name p-1">{{ contato.nome.charAt(0).toUpperCase() }}</h1>
                </div>
                <div class="column is-9 ">
                    <p class="has-text-left">{{ contato.nome }}</p>
                    <p class="has-text-light is-size-7 has-text-left">@{{ contato.slug }}</p>
                </div>
            </div>
        </div>

        <div class="container-messages" ref="containerMessages" style="height: 70%">
            <ul id="mensagens" ref="mensagensList">
                <li 
                    :class="{'me has-background-primary has-text-white' : contato.slug !== msg.from}"
                    v-for="(msg, index) in mensagens" :key="index"> {{ msg.mensagem }}
                </li>
            </ul>
        </div>

        <div class="controls has-background-white pt-4" style="height: 18%;">
            <textarea ref="textAreaMsg" placeholder="mensagem..." rows="10" class="p-2" style="height: 50%; width: 85%; margin-left: 2%;"></textarea>
            <button ref="btnSend" type="button" class="btn-send has-background-primary">
                <img class="p-1" style="height: 100%;" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ2NS44ODIgNDY1Ljg4MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNDY1Ljg4MiAwLTQ2NS44ODIgMjYyLjA1OSAxNDguODg3IDU1LjE0MyAyMjkuNjQzLTIxNS4yOS0xNzQuNjc0IDIzNS42NS4xNDIuMDUzLS4xNzQtLjA1M3YxMjguMzIxbDgzLjQ5NS05Ny40MSAxMDUuNzcgMzkuMTc1eiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4=" />
            </button>
        </div>


    </div>
</template>


<script>


export default {
    
    name: "chatWindow",

    data(){
        return {
            contato: {nome:"gustavo", slug:'gustavo'},
            mensagens:[]
        }
    },

    mounted(){
        
        this.scrollNoFinal();

        this.$root.$on('ativar_conversa', (contato, messages) => {
            this.contato = contato;
            this.mensagens = messages;
        })

        this.$root.$on('nova_mensagem', mensagem => {
            this.mensagens.push(mensagem);
        })
    },

    methods: {
        scrollNoFinal() {
            var messageWindow = this.$refs.containerMessages;
            messageWindow.scrollTop = messageWindow.scrollHeight;
        }
    },

}
</script>

<style>

    .container-messages {
        overflow-y: scroll;
    }

    #mensagens li {
        padding: 10px;
        background-color: white;
        margin:10px;
        width: 45%;
        border-radius: 20px;
        margin-left: 52%;
        text-align:right;
    }

    #mensagens li.me {
        margin-left: 2%;
        text-align:left;
    }

    .btn-send {
        border:none;
        cursor:pointer;
        width: 10%; height: 50%;
    }

</style>