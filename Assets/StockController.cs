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
	public void newStock(string name){
		market.Add (new Stock (name));
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
	private double value;
	public string name;
	private double momentum;
	List<double> history;

	public Stock(string name){
		this.name = name;
		this.value = 100;
		this.momentum = 0;
		history = new List<double> ();
		history.Add (value);
	}

	public void update(){
		int momentumDelta = (Random.Range(-10, 10))/10;
		momentum = momentum + momentumDelta;
		if(momentum>0.8){ momentum = 0.8; }
		else if(momentum< -0.8){ momentum = -0.8; }
		value += momentum;
		history.Add (value);
		Debug.Log (value);
	}

	public double getValue(){
		return value;
	}
}

public class Asset
{
	private int quantity;
	private Stock origin;
	private double boughtPrice;

	public Asset(ref Stock original, int quantity){
		this.quantity = quantity;
		origin = original;
		boughtPrice = origin.getValue ();
	}

	public double getValue(){
		return quantity * origin.getValue();
	}

	public double getProfit(){
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

	public double getValue(){
		double value = 0;
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
		market.newStock ("first Stock");
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
