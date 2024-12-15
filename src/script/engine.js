const state = {
    view:{
        bloco: document.querySelectorAll(".bloco"),
        inimigo: document.querySelector(".inimigo"),
        timeLeft: document.querySelector("#tempo"),
        pontuacao: document.querySelector("#pontuacao"),
        vidas: document.querySelector("#vidas")
    },
    values:{
        posicao_inimigo: document.querySelectorAll(".bloco")[0],
        velociadeJogo: 600,
        pontuacao_jogo: 0,
        vidas_jogo: 5,
        tempo_jogo: 30
    }
};

function limpar_inimigo() { /* Eliminar a classe inimigo */
    state.view.bloco.forEach(function(square){
        square.classList.remove("inimigo");
    });
}

function bloco_aleatorio() {
    let n_aleatorio = Math.floor(Math.random()*9);
    let bloco = state.view.bloco[n_aleatorio];
    return bloco;
}

function limpar_inimigo_bloco(){
    state.values.posicao_inimigo.classList.remove("inimigo");
}

function add_inimigo(bloco_selecionado){
    bloco_selecionado.classList.add("inimigo");
}

function mover_inimigo() {
    let bloco_inimigo = bloco_aleatorio();
    if(state.values.posicao_inimigo == bloco_inimigo) {
        mover_inimigo();
    }else{
        limpar_inimigo_bloco();
        state.values.posicao_inimigo = bloco_inimigo;
        add_inimigo(bloco_inimigo);
        console.log(state.values.posicao_inimigo);
    }
    
}

function listenerclick(){
    state.view.bloco.forEach((square)=>{
        square.addEventListener("mousedown",function(){
            if (square.id == state.values.posicao_inimigo.id) {
                tocar_audio();
                state.values.pontuacao_jogo++;
                state.view.pontuacao.textContent = state.values.pontuacao_jogo;
            } else{
                state.values.vidas_jogo--;
                state.view.vidas.textContent = state.values.vidas_jogo;
            }
        })
    })
}

function tocar_audio() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.08;
    audio.play();
}

function tempo(){
    const intervalo_tempo= setInterval(function() {
        if(state.values.tempo_jogo >= 0){
            state.view.timeLeft.textContent=state.values.tempo_jogo;
            state.values.tempo_jogo--;
        }
    },1000)
}

function inicializacao() {
    limpar_inimigo();
    let velocidade_ms = state.values.velociadeJogo;
    setInterval(mover_inimigo,velocidade_ms);
    listenerclick();
    tempo();
}
inicializacao();