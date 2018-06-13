Die die1;
Die die2;

void setup()
{
	size(300,300);
	noLoop();
	die1=new Die(40,40);
	die2=new Die(160,160);
	strokeWeight(20);
}
void draw()
{	
	background(255);
	die1.roll();
	die2.roll();
		die1.show();
	die2.show();
	fill(0);
	textSize(70);
	textAlign(CENTER);
	text(die1.numDots+die2.numDots, 215,110);
	stroke(0);
	noFill();
	strokeWeight(2);
	rect(0,0,300,300);
 }

void mousePressed()
{
	redraw();
}
	
class Die 
{
	int dieX, dieY, numDots;
	Die(int x, int y) 
	{
		roll();
		dieX=x;
		dieY=y;
	}
	void roll()
	{
		numDots=(int)((Math.random()*5)+1);
	}
	void show()
	{
		stroke(0);
		strokeWeight(1.5);
		fill(255,255,255,255);
		//rect(dieX,dieY,100,100,30);
		beginShape();
		curveVertex(dieX, dieY);
		curveVertex(dieX, dieY);
		curveVertex(dieX, dieY+100);
		curveVertex(dieX+100, dieY+100);
		curveVertex(dieX+100, dieY);
		curveVertex(dieX, dieY);
		curveVertex(dieX, dieY+100);
		curveVertex(dieX, dieY+100);
		endShape();
		strokeWeight(17);
		if(numDots==1)
		{
			point(dieX+50,dieY+50);
		}
		if (numDots==2)
		{
			point(dieX+30,dieY+30);
			point(dieX+70,dieX+70);
		}
		else if (numDots==3)
		{
			point(dieX+30,dieY+30);
			point(dieX+50,dieX+50);
			point(dieX+70,dieY+70);			
		}
		else if (numDots==4)
		{
			point(dieX+30,dieY+30);
			point(dieX+70,dieX+70);
			point(dieX+30,dieY+70);
			point(dieX+70,dieX+30);
		}
		else if (numDots==5)
		{
			point(dieX+30,dieY+30);
			point(dieX+70,dieX+70);
			point(dieX+30,dieY+70);
			point(dieX+70,dieX+30);
			point(dieX+50,dieX+50);
			
		}
		else if (numDots==6)
		{
			point(dieX+30,dieY+30);
			point(dieX+30,dieX+50);
			point(dieX+30,dieY+70);
			point(dieX+70,dieX+30);
			point(dieX+70,dieX+50);
			point(dieX+70,dieX+70);
		}

	}
}