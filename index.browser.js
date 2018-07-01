function jstsEngine(string = '', environment = {}) {

  return new Function(

    [...Object.keys(environment), 'output={}'],

    'return [`' + string + '`, output]'

  ).apply(null, Object.values(environment))

}