using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ItemGlow : MonoBehaviour {

	// Use this for initialization
	void Start () {
    }
	
	// Update is called once per frame
	void Update () {
	}

    void OnMouseOver()
    {
        var renderer = GetComponent<Renderer>();
        renderer.material.shader = Shader.Find("Self-Illumin/Outlined Diffuse");
    }

    void OnMouseExit()
    {
        var renderer = GetComponent<Renderer>();
        renderer.material.shader = Shader.Find("Diffuse");
    }
}
