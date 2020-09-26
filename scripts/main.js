var gameOptions = {

    // bird gravity, 
    Gravity: 800,

    Speed: 1.7,

    taps:1,

    score:5,

    fscore:0,

    goffset:1,

    soffset:2,

    small:0.05,

    topscore:0,

    bgoffset:0.5,

    // flap thrust
   
}

window.onload = function() {
    // FBInstant.initializeAsync()
    // .then(() => {
        let gameConfig = {
            // type: Phaser.AUTO,
            backgroundColor:0x87ceeb,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                parent: 'thegame',
                width: 320,
                height: 480
            },
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 0
                    }
                }
            },
            scene: [Scene1,Scene2]
        }
    this.game = new Phaser.Game(gameConfig);
    window.focus();
// });
}

  //scene 2

  class Scene1 extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }

    preload(){
        
        this.load.image('background','assets/background.png');
        
        this.load.image('playButton','assets/play_button.png');
        // FBInstant.setLoadingProgress(20);
        this.load.image('platform','assets/platform.png');
        this.load.image('title','assets/title2.png');
        // FBInstant.setLoadingProgress(40);
        this.load.image('playAgain','assets/playAgain.png');
        this.load.audio('title_song',['assets/SoundHelix-Song-2.mp3','assets/oedipus_wizball_highscore.ogg']);
        // this.load.audio('title_song','./assets/SoundHelix-Song-2.mp3');
        // FBInstant.setLoadingProgress(60);
        this.load.spritesheet('dude', 
          './assets/dude.png',
          { frameWidth: 32, frameHeight: 48 }
        );
        this.load.image('rules_icon','assets/rules_icon.png');
        // FBInstant.setLoadingProgress(80);
        this.load.image('rules','assets/rules4.png');

        console.log('here');

        // FBInstant.setLoadingProgress(100);

        console.log('loading completed');
        
    }


    create() {
            
        

        this.background=this.add.tileSprite(0,0,game.config.width,game.config.height,'background').setScale(1);
        this.background.setOrigin(0,0);

        this.platform1 = this.physics.add.image(0,300, 'platform').setScale(1.3);
        this.setplatform(this.platform1);

        this.platform2 = this.physics.add.image(200,200 , 'platform').setScale(1.3);
        this.setplatform(this.platform2);
        

        this.platform3 = this.physics.add.image(400,50 , 'platform').setScale(1.3);
        this.setplatform(this.platform3);

        this.player=this.physics.add.sprite(100,270,'dude').setScale(1.1);

        let playButton = this.add.image(game.config.width/2, 150, 'playButton').setScale(0.8);

        let rulesbutton =this.add.image(game.config.width/2+70,game.config.height-30,'rules_icon').setScale(0.25);

        this.rules =this.add.image(game.config.width/2,game.config.height/2+30,'rules').setScale(0.35);

        let title = this.add.image(game.config.width/2, 80, 'title').setScale(0.3);

        this.rules.visible=false;
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        rulesbutton.setInteractive();
        playButton.setInteractive();
        playButton.on("pointerup", () => {
            // console.log('clicked');
            this.scene.start("playGame");
        });

        rulesbutton.on('pointerup',()=>{
           if(this.rules.visible ){
               this.rules.visible=false;
           }
           else{
               this.rules.visible=true;
           }
        });
    }

    update(){
        this.background.tilePositionX+=0.5;
        this.player.anims.play('right', false);
    }

    setplatform(platform){
        platform.setOrigin(0,0);
        platform.body.immovable=true;
    }
  }

  //scene 3

  class Scene2 extends Phaser.Scene{
      constructor(){
          super('playGame');
      }

    //   right=[];
    // timer;

     create() {
        
        this.music = this.sound.add('title_song');
        this.music.play();
        this.right=[];
        this.do=1;
        this.settingsinit();
        this.background=this.add.tileSprite(0,0,game.config.width,game.config.height,'background').setScale(1);
        this.background.setOrigin(0,0);

        this.platform1 = this.physics.add.image(0,300, 'platform').setScale(1.3);
        this.setplatform(this.platform1);

        this.time.addEvent({ 
             delay: 3000,
             callback: this.myfunction, 
             callbackScope: this, 
             loop: true 
            });

        this.platform2 = this.physics.add.image(200,200 , 'platform').setScale(1.3);
        this.setplatform(this.platform2);
        

        this.platform3 = this.physics.add.image(400,100 , 'platform').setScale(1.3);
        this.setplatform(this.platform3);
        this.right.push(this.platform3);
        

        this.player=this.physics.add.sprite(100,270,'dude').setScale(1);
        this.player.setCollideWorldBounds(true);
        this.player.body.gravity.y = 800;

        this.input.on('pointerdown', this.jump, this);

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.playAgain = this.add.image(game.config.width/2, game.config.height/2-15, 'playAgain').setScale(0.25);
        this.playAgain.visible = false;
        this.playAgain.setInteractive();

        // this.check(this.platform1);
        
        this.physics.add.collider(this.player, this.platform1);
        this.physics.add.collider(this.player, this.platform2);
        this.physics.add.collider(this.player, this.platform3);

        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '1rem', fill: '#000' });
        
        this.playAgain.on("pointerup", () => {
            // console.log('clicked');
            this.scene.start("playGame");
        })
    
        
    }

    update(){

        if (this.player.body.touching.down)
        {   gameOptions.score += gameOptions.small;
            this.player.anims.play('right', true);
            this.updatescore();
        }
        else{
            this.player.anims.play('right', false);
        }

        if(this.player.body.onFloor()||gameOptions.fscore<0){
            // this.physics.pause();
            this.gamover();
            

            
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        if (this.cursors.left.isDown)
        {
           console.log(gameOptions.soffset);
           console.log(gameOptions.goffset);
           console.log(gameOptions.score);
           console.log(gameOptions.taps);
        }
        
        this.move(this.platform1);
        this.move(this.platform2);
        this.move(this.platform3);

        
        
        this.background.tilePositionX+=gameOptions.bgoffset;

        
    }

    settingsinit(){
        console.log('hello');
                this.jmp=0;
                gameOptions.Speed=1.9;
                gameOptions.goffset=1;
                gameOptions.soffset=2;
                gameOptions.score=5;
                gameOptions.taps=1;
                gameOptions.fscore=0;
                gameOptions.bgoffset=1;
                gameOptions.small=0.05;
            }
    myfunction(){
        gameOptions.Speed+=0.15*this.do;
        gameOptions.goffset+=0.225*this.do;
        gameOptions.soffset+=0.13*this.do;
        gameOptions.small+=0.002*this.do;
        gameOptions.bgoffset+=0.03*this.do;
        this.jmp+=0.05
    }

    gamover(){
        this.scoreText.text = 'Score: ' + gameOptions.fscore + '\nBest: ' + gameOptions.topscore  ;
        this.playAgain.visible = true;
        gameOptions.Speed=0;
        gameOptions.bgoffset=0;
        gameOptions.soffset=0;
        gameOptions.small=0;
        this.do=0;
        this.music.stop();
        game.paused=true;
        
    }

    setplatform(platform){
        platform.setOrigin(0,0);
        platform.body.immovable=true;
    }
                
    move(platform){
        platform.x+=-1*gameOptions.Speed;
        if(platform.getBounds().right<0){
            var check=0;
            while(check<80){
                var offsety=Phaser.Math.Between(70,game.config.height-50);
                var offsetx=game.config.width+Phaser.Math.Between(50, 75);
                check=this.right[0].y-offsety;
                if(check<0){
                    check*=-1;
                }
            }
            platform.x=offsetx;
            platform.y=offsety;
            this.right=[];
            this.right.push(platform);
            gameOptions.score += gameOptions.soffset;
            this.updatescore();
        }
    }
            
    updatescore(){
        gameOptions.fscore = Math.floor( gameOptions.score-(gameOptions.taps*gameOptions.goffset));
        gameOptions.topscore=Math.max(gameOptions.topscore,gameOptions.fscore);
        this.scoreText.text = 'Score: ' + gameOptions.fscore + '\nBest: ' + gameOptions.topscore  ;
    }

    jump(){
        gameOptions.taps++;
        this.player.body.velocity.y = -(400-this.jmp);
        this.updatescore();
    }


  }

  
