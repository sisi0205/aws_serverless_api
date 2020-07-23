## source code



[Starter code for 'Create a Serverlesss App' tutorial:](https://github.com/jspruance/hexal-serverless-starter)

[Completed code for 'Create a Serverlesss App' tutorial](https://github.com/jspruance/hexal-serverless-starter-complete)



##  Download and install the UI

```bash
git clone https://github.com/jspruance/hexal-serverless-starter.git
### install packages in configuration file 
npm i 
npm start 

```



## Create DynamoDB table



## Create Lambda basic execution role

### ARN

arn:aws:dynamodb:us-east-2:825295840983:table/Products

### Policy

#### 1. AWSLambdaBasicExecutionRole

```jason
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        }
    ]
}

```

#### 2. add inline policy

![image-20200723155544485](./Serverless_app_tutorial/image-20200723155544485.png)

 click `Add ARN`

![image-20200723160005384](Serverless_app_tutorial/image-20200723160005384.png)

copy ARN of table and paste 



![image-20200723160119604](Serverless_app_tutorial/image-20200723160119604.png)



![image-20200723160242773](Serverless_app_tutorial/image-20200723160242773.png)





## Create Lambda functions

### source code

[ Hexal laambda functions](https://github.com/jspruance/hexal-serverless-starter-complete)



### hexalPut

![image-20200723160608265](Serverless_app_tutorial/image-20200723160608265.png)

hexalPut.js

```js
'use strict'
const AWS = require('aws-sdk')

exports.handler = async (event) => {
    // TODO implement
    const doucumentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;
    
    const params = {
        TableName: "Products",
        Item: {
            id: '12345',
            productname: 'Solar panels'
        }
    }
    
    try {
        // put data into dynamoDB 
        const data = await doucumentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 200;
        
    } catch(err){
        responseBody = `Unable to put product: ${err}`;
        statusCode = 403;
    }
    
    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body:responseBody
    };
    
    return response;
    
};

```

### hexalDelete.js

```js
'use strict'
const AWS = require('aws-sdk')

exports.handler = async (event) => {
    // TODO implement
    const doucumentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Products",
        Key: {
            id: '12345',
        }
    }

    try {
        // put data into dynamoDB
        const data = await doucumentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;

    } catch(err){
        responseBody = `Unable to delete product: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body:responseBody
    };

    return response;

};

```



### hexalGetItems.js

```js
'use strict'
const AWS = require('aws-sdk')

exports.handler = async (event) => {
    // TODO implement
    const doucumentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Products"
    }

    try {
        // put data into dynamoDB
        const data = await doucumentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;

    } catch(err){
        responseBody = `Unable to get product: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body:responseBody
    };

    return response;

};

```



### hexalUpdateItems.js

```js
'use strict'
const AWS = require('aws-sdk')

exports.handler = async (event) => {
    // TODO implement
    const doucumentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "Products",
        Key: {
            id: '12345'
        },
        UpdateExpression: "set productname = :n",
        ExpressionAttributeValues: {
          ":n": " water pumps"
        },
        ReturnValues: "UPDATED_NEW"
        }

    try {
        // put data into dynamoDB
        const data = await doucumentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;

    } catch(err){
        responseBody = `Unable to update product: ${err}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body:responseBody
    };

    return response;

};

```





## Create REST API GateWay

#### create api

![image-20200723165009159](Serverless_app_tutorial/image-20200723165009159.png)



#### create resource



![image-20200723165104348](Serverless_app_tutorial/image-20200723165104348.png)



#### create id 

![image-20200723165244987](Serverless_app_tutorial/image-20200723165244987.png)





### source code

[lambda function code](https://github.com/jspruance/hexal-lambda-functions)

### put  (POST method)

![image-20200723165427629](Serverless_app_tutorial/image-20200723165427629.png)



![image-20200723180218905](Serverless_app_tutorial/image-20200723180218905.png)

#### add  HTTP request headers

![image-20200723165558430](Serverless_app_tutorial/image-20200723165558430.png)



#### create a model

[models and mapping templates](https://docs.aws.amazon.com/apigateway/latest/developerguide/models-mappings.html)

[How do I associate a model with my API in API Gateway?](https://aws.amazon.com/premiumsupport/knowledge-center/model-api-gateway/)

![image-20200723170342791](Serverless_app_tutorial/image-20200723170342791.png)

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "ProductsInputModel",
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "productname": {
            "type": "string"
        }
    }
}
```

![image-20200723170514198](Serverless_app_tutorial/image-20200723170514198.png)

#### update code



```js
'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id, productname } = JSON.parse(event.body);

  const params = {
    TableName: "Products",
    Item: {
      id: id,
      productname: productname
    }
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch(err) {
    responseBody = `Unable to put product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};

```

#### test



![image-20200723172629302](Serverless_app_tutorial/image-20200723172629302.png)



### delete

#### create delete 



![image-20200723172821729](Serverless_app_tutorial/image-20200723172821729.png)



#### edit method request

![image-20200723180046380](Serverless_app_tutorial/image-20200723180046380.png)

![image-20200723174002513](Serverless_app_tutorial/image-20200723174002513.png)



#### update code

```json
'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id } = event.pathParameters;

  const params = {
    TableName: "Products",
    Key: {
      id: id
    }
  };

  try {
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to delete product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};
```



#### test

![image-20200723174400566](Serverless_app_tutorial/image-20200723174400566.png)

### getAll

#### create a method

![image-20200723174615404](Serverless_app_tutorial/image-20200723174615404.png)

### update

#### create patch method 

![image-20200723175148989](Serverless_app_tutorial/image-20200723175148989.png)



#### update method request

![image-20200723180128219](Serverless_app_tutorial/image-20200723180128219.png)

![image-20200723175316419](Serverless_app_tutorial/image-20200723175316419.png)



#### update code

```js
'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id, productname } = JSON.parse(event.body);

  const params = {
    TableName: "Products",
    Key: {
      id: id
    },
    UpdateExpression: "set productname = :n",
    ExpressionAttributeValues: {
      ":n": productname
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch(err) {
    responseBody = `Unable to update product: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};
```



#### test

![image-20200723175503409](Serverless_app_tutorial/image-20200723175503409.png)

## Integrate REST APT with UI

### source code

[complete code](https://github.com/jspruance/hexal-serverless-starter-complete/tree/master/src/components)

### Enable CORS

add 'Access-Control-Allow-Origin': '*' to headers 

```json
"Access-Control-Allow-Origin": "*"
```

### deploy 

![image-20200723180755944](Serverless_app_tutorial/image-20200723180755944.png)

### update src/confi.json

```json
{
  "api": { 
    "invokeUrl": "https://vgp03n7qf9.execute-api.us-east-2.amazonaws.com/prod"
  } 
}
```



### getAll 

#### update components/Products.js

update fetchProducts

```json
fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }
```



#### update ProductAdmin.js

update fetchProducts

```json
  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }
```



### post

#### update ProductAdmin.js

update handleAddProduct

```js
handleAddProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        "id": id,
        "productname": this.state.newproduct.productname
      };
      await axios.post(`${config.api.invokeUrl}/products/${id}`, params);
      this.setState({ products: [...this.state.products, this.state.newproduct] });
      this.setState({ newproduct: { "productname": "", "id": "" }});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }
```



### delete

### update ProductAdmin.js

update handleDeleteProduct

```js
handleDeleteProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedProducts = [...this.state.products].filter(product => product.id !== id);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }
```



### update

#### update ProductAdmin.js

update handleUpdateProduct

```js
handleUpdateProduct = async (id, name) => {
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "id": id,
        "productname": name
      };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);
      const productToUpdate = [...this.state.products].find(product => product.id === id);
      const updatedProducts = [...this.state.products].filter(product => product.id !== id);
      productToUpdate.productname = name;
      updatedProducts.push(productToUpdate);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }
```



## Veriy functionality

