import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './MainMenu.js'; 
import MiHeladera from './MiHeladera.js'; 
import Recetas from './Recetas.js'; 
import CamaraHeladera from './CamaraHeladera.js'; 
import ProgramarCompras from './ProgramarCompras.js';
import QuienesSomos from './QuienesSomos.js';  
import Configuracion from './Configuracion.js';  
import Instrucciones from './Instrucciones.js';  
import { Image, View, Text } from 'react-native';
import SobreLaApp from './SobreLaApp.js';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <Image
        style={{ width: 35, height: 35, marginRight: 10 }}
        source={require('./assets/logo.png')}
      />
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Que hay?</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen 
          name="Que hay?" 
          component={MainMenu} 
          options={{
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              display: 'none',
            },
            headerTitle: props => <LogoTitle {...props} />,
          }}
        />
        <Stack.Screen 
          name="MiHeladera" component={MiHeladera} 
          options={{
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              display: 'none',
            },
            headerTitle: props => <LogoTitle {...props} />,
          }}
        />
        <Stack.Screen 
          name="Recetas" component={Recetas} 
          options={{
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              display: 'none',
            },
            headerTitle: props => <LogoTitle {...props} />,
          }}/>
        <Stack.Screen 
        name="ProgramarCompras" component={ProgramarCompras} 
        options={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            display: 'none',
          },
          headerTitle: props => <LogoTitle {...props} />,
        }}/>
        <Stack.Screen name="Configuracion" component={Configuracion} 
        options={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            display: 'none',
          },
          headerTitle: props => <LogoTitle {...props} />,
        }}/>
        <Stack.Screen name="CamaraHeladera" component={CamaraHeladera} 
        options={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            display: 'none',
          },
          headerTitle: props => <LogoTitle {...props} />,
        }}/>
        <Stack.Screen name="Instrucciones" component={Instrucciones} 
        options={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            display: 'none',
          },
          headerTitle: props => <LogoTitle {...props} />,
        }}/>
        <Stack.Screen name="QuienesSomos" component={QuienesSomos} 
        options={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            display: 'none',
          },
          headerTitle: props => <LogoTitle {...props} />,
        }}/>
         <Stack.Screen name="SobreLaApp" component={SobreLaApp} 
        options={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            display: 'none',
          },
          headerTitle: props => <LogoTitle {...props} />,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
