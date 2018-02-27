using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class graphStocks : MonoBehaviour {

	public UnityEngine.UI.Extensions.UILineRenderer LineRenderer; // Assign Line Renderer in editor
	public UnityEngine.UI.Text XValue; // Test Input field to supply new X Value
	public UnityEngine.UI.Text YValue; // Test Input field to supply new Y Value

	public void Start(){
		for (int i = 0; i < 100; i++) {
			AddNewPoint (i, i);
		}
	}

	public void Update(){
		
	}

	// Use this for initialization
	public void AddNewPoint (float x, float y) {
		var point = new Vector2() { x = x, y = y };
		var pointlist = new List<Vector2>(LineRenderer.Points);
		pointlist.Add(point);
		LineRenderer.Points = pointlist.ToArray();
	}


}
