# Lenses ![Lenses](https://raw.githubusercontent.com/lenses/lenses-react/master/public/images/lenses-logo.png
"Lenses")

## introduction
Lenses is an open source tool to create and publish data visualizations quickly on
the web. Visualizations are created from components. There are three
types of components. Input components to grab or create data, transform
components that manipulate data, and output components that get
published to visualize the data.

You can run it locally but we also maintain a hosted version at
<www.makelenses.com>

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

## setup
1. clone repo
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

The MIT License (MIT)
Copyright (c) 2016 <Kareem Amin, Sepand Ansari, Nisha Batra>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## thanks to

Sepand Ansari
Nisha Batra
Puneet Sabharwal 
Nicolae Rusan
NYC Media Lab
Luke Dubois
Mark Hansen
Helen Carson
Nivvedan Selvan

