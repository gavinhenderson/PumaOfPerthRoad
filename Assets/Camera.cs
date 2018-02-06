using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class Camera : MonoBehaviour {

    private int northBoxTop;
    private int northBoxBot;
    private int southBoxTop;
    private int southBoxBot;
    private int eastBoxLeft;
    private int eastBoxRight;
    private int westBoxLeft;
    private int westBoxRight;
    private int boxWidth; //A percentage
    private int moveSpeed;

    private Vector3 prev;
    private Quaternion startPos;
    private double bound;

	// Use this for initialization
	void Start () {
        bound = 0.05;
        boxWidth = 10;
        moveSpeed = 30;
        northBoxTop = Screen.height;
        northBoxBot = Screen.height-(Screen.height/(100/boxWidth));
        southBoxBot = 0;
        southBoxTop = (Screen.height / (100 / boxWidth));
        westBoxLeft = 0;
        westBoxRight = (Screen.width / (100 / boxWidth));
        eastBoxRight = Screen.width;
        eastBoxLeft = Screen.width - (Screen.width / (100 / boxWidth));
        prev = Input.mousePosition;
        startPos = transform.rotation;
	}
	
	// Update is called once per frame
	void Update () {
        float x = Input.mousePosition[0];
        float y = Input.mousePosition[1];
        bool moved = false;
        if (x>eastBoxLeft && x < eastBoxRight)
        {
            if (startPos[1] - transform.rotation[1] > -1*bound)
            {
                transform.Rotate(0, moveSpeed * Time.deltaTime, 0, Space.Self);
            }
            moved = true;
        }
        if(x>westBoxLeft && x < westBoxRight)
        {
            if (startPos[1] - transform.rotation[1] < bound)
            {
                transform.Rotate(0, -1 * moveSpeed * Time.deltaTime, 0, Space.Self);
            }
            moved = true;
        }
        if(y>northBoxBot && y < northBoxTop)
        {
            if (startPos[0] - transform.rotation[0] < bound)
            {
                transform.Rotate(-1 * moveSpeed * Time.deltaTime, 0, 0, Space.Self);
            }
            moved = true;
        }
        if(y>southBoxBot && y< southBoxTop)
        {
            if (startPos[0] - transform.rotation[0] > -1*bound)
            {
                transform.Rotate(moveSpeed * Time.deltaTime, 0, 0, Space.Self);
            }
            moved = true;
        }
        if (!moved)
        {
            float step = moveSpeed * Time.deltaTime;
            transform.rotation = Quaternion.RotateTowards(transform.rotation, startPos, step);
        }
	}
}
