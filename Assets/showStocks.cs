using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class showStocks : MonoBehaviour {
    GameObject canvas;

	// Use this for initialization
	void Start () {
        canvas = GameObject.Find("Stocks");
        canvas.SetActive(false);
    }

    // Update is called once per frame
    void Update () {
		
	}

    public void OnMouseDown()
    {
        canvas.SetActive(true);
    }
}
