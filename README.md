# ![Lenses](https://raw.githubusercontent.com/lenses/lenses-react/master/public/images/lenses-logo.png "Lenses") Lenses 

## introduction
Lenses is an open source tool to create and publish data visualizations quickly on
the web. Visualizations are created from components. There are three
types of components. Input components to grab or create data, transform
components that manipulate data, and output components that get
published to visualize the data.

The benefits of using Lenses for visualization creators are:

1. Every visualization links back to the set of components that created
   it, including the data. This maintains the data provenance and allows
   others to download the data for a visualization, making
   visualizations reproducible and trustworthy.
2. Create visualizations from any vendor. You can create
   graphics that were made from D3/4, Google Charts, High Charts,
   Cartodb, Mapbox, etc as long as there is a component for that chart.
3. Easy to get started with existing components but an open platform for
   more advanced users to modify any part of the components or develop
   new ones.
4. The more people use the platform and create components for it, the
   more options there are to create visualizations and the better the
   tool gets for everyone.

For Developers:

1. The data is in the same format so you can focus on the transformation
   or the visualization and not the data mangling unless you are
   building an input component. Input components need to transform the
   data to the Lenses format.
2. It's easy to get started! Components are simply React components with props 
   that pass in the data, dataSchema and a function to allow your component 
   to manipulate the data if necessary.

## how do i get started

1. You can use it at www.makelenses.com
2. You can run it locally by following the instructions below for setup.

## setup
1. `git clone https://github.com/lenses/lenses-react.git`
2. `npm install`
3. `gulp serve` (`npm install -g gulp` if gulp is not installed.)

run npm install again if it failed to install all the dependencies

## develop a custom component
1. fork the project
2. run the setup instructions
3. create a .jsx react file in app/components/core
4. the filename is the name of your component. capitalize every word.
5. submit a pull request

## license

Copyright (c) 2016 Kareem Amin, Sepand Ansari, Nisha Batra

The MIT License [MIT](http://opensource.org/licenses/mit-license.php)

## thanks to

Sepand Ansari, Nisha Batra, Helen Carson, Amy Chen, Luke Dubois, Katie Gemmill, Mark Hansen, Justin Hendrix, Nicolae Rusan, Puneet Sabharwal, Nivvedan Selvan, NYC Media Lab

