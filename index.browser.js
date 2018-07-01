function jstsEngine(string = '', environment = {}) {

  return new Function(
    ...Object.keys(environment),
    'output={}',
    'return [`' + string + '`, output]'
  )(...Object.values(environment))

}