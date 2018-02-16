using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HideStocks : MonoBehaviour {

    public void hideStocks()
    {
        GameObject canvas = GameObject.Find("Stocks");
        canvas.SetActive(false);
    }
}
