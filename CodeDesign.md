# Puma Of Perth Road - Code Design

#### Gavin Henderson

Contents:

- Level Design

  - Overview

  - Stages

- Decisions

- Class Design

  - Overview

  - UML Class Diagram

  - Class Responsibilities

  - UML Activity Diagrams

## Level Design

### Overview

My game doesn't use a conventional levelling system so it is hard to define these levels in a conventional way. However, there is still clear progression paths that can be taken or not taken so these paths will be outlined here. I will outline the base path that all users must take through the game then I will outline all desicions that must be made by the user and the effect they will have. You reach the next 'level' by making enough money to buy your way up a level. These levels also indicate the order in which I plan to implement the game so some of the later levels may not be in the final game.

These goals which I use to mark 'levels' are on a scale so you can be at the start of one 'level' and the end of another.

### Stages

1. Manual Penny Stock Trading

2. Automated paperwork

3. Manual Buying But Auto Selling

4. Auto Buying and Selling

5. Stock Shorting

#### 1. Manual Trading

At this level the entire penny stocks market is open for the user to view. However, there are some restrictions placed on what they can do. Initially the user is working at his own company without any staff to do the paperwork so every time a trade is made there is a cooling off period because they must manually process the order. The cool down time is expected to be about ten seconds but this is subject to change during play testing.

#### 2. Automated paperwork

This level allows you to remove the cool down period that happens after every transaction by employing somone to manage those tasks. This means that the market is now fully open to transactions so you can make or lose lots of money.

#### 3. Auto selling

Once you have reached this level you can employ other traders. However, the initial traders you can afford aren't very good so only have the ability to sell stocks when they see they are tanking or when they have made lots of money. Essentially this level is just sell triggers, leaving the player to focus on buying when there are dips in the market.

#### 4. Auto buying

Eventually you will be able to employ better traders who have the ability to both buy and sell freely on the market. These traders are smart enough to see whats happening in the market so they can make money easiliy. 

#### 5. Stock Shorting

At this level you will have the ability to 'short' stocks. This is when you bet against a stock in the hope that the price falls, the danger in this is that the potential losses are infinite.

## Decisions

Throughout the game the user will be presented with decisions to make that will effect them directly. The effects may be immediate or may be much later down the line. The decisions will generally be between good and bad. The good having a short term negative effect and the bad having a short term good effect but long term there is a random chance that it is negative. Here I will outline all the decisions to be made. All of these decisions may not be in the final game.

Through the email pane in the game the user will recieve **insider tips** that they will have to chose wether or not to use or to. If you report the insider tip then you will be given money by the government as a reward and there will be no long term effect. If you accept the tip you will be given more money than if you decline however there will be long term consequences. The FBI may chose to investigate you later on in the game and there is a small chance that they find you guilty and demand a fine much larger than the money you made from the initial tip.

Another decision that the user must make is whether or not to cut corners when it comes to **tax returns**. After a set amount of days the user will be asked to submit a tax return form to the governemnt. At this point they will have the option to send an honest tax form meaning they have to pay lots of tax or they can opt to lie and pay less in tax. If they chose the honest route they will have no long term consequences. If they opt to lie they will initally not pay a lot of money but there will be a chance that they will be given a large fine later on in the game. 

Throughout the game there will be oppertunities to make your employees more productive by providing **employee fun days** which can vary in what the activity is but in general it will be something outrages. For example it may be 'midget tossing', taken from the movie. The activity price will vary but will often be quite expensive but the benifits will be also large. These activies will temporarily increase productivity of the staff meaning their automation is more profitiable but they will demand activies like this more often and will become unproductive if they dont get them.

## Class Design

#### Explanation

Overall, I have aimed to use an Model View Controller approach to building my codebase. This is easily achievable using javascript and HTML as I can write all of my DOM manipulation code into my 'view' classes and all of the code relevant to the model never has to think about how it is going to be shown to the user. Every aspect of my game will have a Model component which will be able to work independantly of any user interface. It will also have a view class which will be able to display the model to the user. Lastly, it will have a controller which will be able to take input and make it useable to a model. The controllers will also be used to connect all of the system together as well as be an event handler.

I also use a Loop pattern to allow for the game to update periodically. I split my loops into a gameLoop and a viewLoop. Its easy to run things in seperate 'threads' in JS so for simplicity I run the view loop and game loop on different threads. The viewLoop will make sure that everything the user sees is up to date and the game loop will make sure the model code is executed at the right time.

The 'update' function in my views may not will take advantage of a 'dirty flag'. DOM updates are very expensive to perform so the dirty flag will mean that they are only done when actually necesassry.

#### UML Class Diagrams

#### Class Responsibility

#### UML Activity Diagrams
