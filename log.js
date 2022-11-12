class Obstacle_1 {
    constructor(x, y, width, height, angle) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.angle = angle;
      this.obstacle_image = loadImage("assets/log.png");
      
    }
    display() {
     
  
  
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      imageMode(CENTER);
      image(this.obstacle_image, 0, 0, this.width, this.height);
      pop();
     
      noFill();
    }
  }
  