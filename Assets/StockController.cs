using System.Collections;
using System.Collections.Generic;
using UnityEngine;


//The stock market is made up of lots of different stocks of varying prices
public class Market
{
	//Stores all the stocks currently on the market
	List<Stock> market;

	public Market(){
		market = new List<Stock> ();
	}

	//Randomly creates a new stock and adds it to the market given a name
	public void newStock(string name, float offset){
		market.Add (new Stock (name,offset));
	}

	//Update all of the stocks
	public void update(){
		foreach (var stock in market) {
			stock.update ();
		}
	}
}

public class Stock
{
	private float value;
	public string name;
	private float momentum;
	List<float> history;
	private float offset; //between -1 and 1

	public Stock(string name, float offset){
		this.offset = offset;
		this.name = name;
		this.value = 100;
		this.momentum = 0;
		history = new List<float> ();
		history.Add (value);
	}

	public void update(){
		float randInt = Random.Range (-10, (10+(offset*10)));
		float momentumDelta = randInt/(10);
		//Debug.Log (momentumDelta);
		momentum = momentum + momentumDelta;
		if(momentum>(0.8f+offset)){ 
			momentum = 0.8f+offset; 
		}
		else if(momentum< -0.8){
			momentum = -0.8f; 
		}
		value += momentum;
		history.Add (value);
		Debug.Log (this.name+":"+this.value);
	}

	public float getValue(){
		return value;
	}
}

public class Asset
{
	private int quantity;
	private Stock origin;
	private float boughtPrice;

	public Asset(ref Stock original, int quantity){
		this.quantity = quantity;
		origin = original;
		boughtPrice = origin.getValue ();
	}

	public float getValue(){
		return quantity * origin.getValue();
	}

	public float getProfit(){
		return quantity * (origin.getValue() - boughtPrice);
	}
}

public class Portfolio
{
	private List<Asset> assets;

	public Portfolio(){
		assets = new List<Asset> ();
	}

	public void addAsset(Asset newAsset){
		assets.Add (newAsset);
	}

	public float getValue(){
		float value = 0;
		foreach (var asset in assets) {
			value += asset.getValue ();
		}
		return value;
	}
}



public class StockController : MonoBehaviour {
	private Market market;
	private float period;

	// Use this for initialization
	void Start () {
		market = new Market ();
		market.newStock ("first Stock",0f);
		market.newStock ("second stock", 0.2f);
		market.newStock ("third stock", -0.2f);
		period = 0;
	}
	
	// Update is called once per frame
	void Update () {
		if (period > 0.1)
		{
			market.update ();
			period = 0;
		}
		period += UnityEngine.Time.deltaTime;
	}
}
