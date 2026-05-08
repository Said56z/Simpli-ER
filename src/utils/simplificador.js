// =====================
// HISTORIAL Y ESTADO
// =====================
let pasos = [];
let ultimaRegla = "";
let simplificado = false;

function registrar(regla, resultado) {
  pasos.push({ regla, resultado });
}

// =====================
// PARSER (Soporta u, *, +, ⁺)
// =====================
function parse(exp) {
  let i = 0;

  function parseUnion() {
    let node = parseConcat();
    while (exp[i] === 'u') {
      i++;
      node = { type: 'union', left: node, right: parseConcat() };
    }
    return node;
  }

  function parseConcat() {
    let nodes = [];
    while (i < exp.length && exp[i] !== ')' && exp[i] !== 'u') {
      nodes.push(parseStar());
    }
    return nodes.length === 1 ? nodes[0] : { type: 'concat', nodes };
  }

  function parseStar() {
    let node = parseAtom();
    while (exp[i] === '*' || exp[i] === '+' || exp[i] === '⁺') {
      let type = (exp[i] === '*') ? 'star' : 'plus';
      i++;
      node = { type: type, node: node };
    }
    return node;
  }

  function parseAtom() {
    if (exp[i] === '(') {
      i++;
      let node = parseUnion();
      i++; // Salta ')'
      return node;
    }
    return { type: 'symbol', value: exp[i++] };
  }

  return parseUnion();
}

// =====================
// UTILIDADES
// =====================
function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function flattenUnion(node) {
  if (node.type === 'union') {
    return [...flattenUnion(node.left), ...flattenUnion(node.right)];
  }
  return [node];
}

function esSubconjunto(nodoA, nodoB) {
  if (same(nodoA, nodoB)) return true;
  if (nodoB.type === 'star') {
    // Epsilon (3) siempre es subconjunto de una estrella
    if (nodoA.type === 'symbol' && nodoA.value === '3') return true;
    if (nodoA.type === 'union') return esSubconjunto(nodoA.left, nodoB) && esSubconjunto(nodoA.right, nodoB);
    if (nodoA.type === 'concat') return nodoA.nodes.every(n => esSubconjunto(n, nodoB));
    if (nodoA.type === 'star' || nodoA.type === 'plus') return esSubconjunto(nodoA.node, nodoB);
    if (nodoA.type === 'symbol') {
      let contenidoB = flattenUnion(nodoB.node);
      return contenidoB.some(u => same(u, nodoA) || (u.type === 'star' && same(u.node, nodoA)));
    }
  }
  return false;
}

// =====================
// AST → STRING
// =====================
function toString(node) {
  if (!node) return "";
  if (node.type === 'symbol') return node.value === '3' ? 'ε' : node.value;

  if (node.type === 'star' || node.type === 'plus') {
    let inner = toString(node.node);
    let symbol = node.type === 'star' ? '*' : '⁺';
    return node.node.type === 'symbol' ? inner + symbol : `(${inner})${symbol}`;
  }

  if (node.type === 'union') return `${toString(node.left)}u${toString(node.right)}`;

  if (node.type === 'concat') {
    return node.nodes.map(n => {
      let s = toString(n);
      return n.type === 'union' ? `(${s})` : s;
    }).join('');
  }
}

// =====================
// SIMPLIFICADOR CORE
// =====================
function simplificarAST(node) {
  if (!node || simplificado) return node;

  // --- UNION ---
  if (node.type === 'union') {
    node.left = simplificarAST(node.left);
    node.right = simplificarAST(node.right);
    if (simplificado) return node;

    let parts = flattenUnion(node);
    let unique = [];
    for (let p of parts) {
      if (!unique.some(u => same(u, p))) unique.push(p);
    }

    // Regla: a u a⁺ = a⁺
    for (let p of unique) {
      if (p.type === 'plus') {
        for (let q of unique) {
          if (same(p.node, q)) {
            ultimaRegla = "a ∪ a⁺ = a⁺";
            simplificado = true;
            let filtered = unique.filter(item => !same(item, q));
            return filtered.length === 1 ? filtered[0] : filtered.reduce((acc, curr) => ({ type: 'union', left: acc, right: curr }));
          }
        }
      }
    }

    // Absorción: r u s = s (si r ⊆ s)
    let absorbed = [];
    for (let i = 0; i < unique.length; i++) {
      let isSubset = false;
      for (let j = 0; j < unique.length; j++) {
        if (i === j) continue;
        if (esSubconjunto(unique[i], unique[j])) {
          if (esSubconjunto(unique[j], unique[i]) && i < j) continue;
          isSubset = true; break;
        }
      }
      if (!isSubset) absorbed.push(unique[i]);
    }

    if (absorbed.length < unique.length) {
      ultimaRegla = "Ley de Absorción: r ⊆ s";
      simplificado = true;
      return absorbed.length === 1 ? absorbed[0] : absorbed.reduce((acc, curr) => ({ type: 'union', left: acc, right: curr }));
    }

    // Idempotencia: a u a = a
    if (unique.length < parts.length) {
      ultimaRegla = "a ∪ a = a";
      simplificado = true;
      return unique.length === 1 ? unique[0] : unique.reduce((acc, curr) => ({ type: 'union', left: acc, right: curr }));
    }

    // Factorización (Distributividad)
    if (unique.length >= 2) {
      let partsNodes = unique.map(p => p.type === 'concat' ? p.nodes : [p]);
      let primerNodo = partsNodes[0][0];
      if (partsNodes.every(p => same(p[0], primerNodo))) {
        ultimaRegla = "Factor Común (Distributividad)";
        simplificado = true;
        let resto = partsNodes.map(p => {
          let r = p.slice(1);
          if (r.length === 0) return { type: 'symbol', value: '3' };
          return r.length === 1 ? r[0] : { type: 'concat', nodes: r };
        });
        return { type: 'concat', nodes: [primerNodo, resto.reduce((acc, curr) => ({ type: 'union', left: acc, right: curr }))] };
      }
    }
    return node;
  }

  // --- CONCAT ---
  if (node.type === 'concat') {
    node.nodes = node.nodes.map(simplificarAST);
    if (simplificado) return node;
    let filtered = node.nodes.filter(n => !(n.type === 'symbol' && n.value === '3'));
    if (filtered.length === 0) return { type: 'symbol', value: '3' };
    if (node.nodes.length !== filtered.length) {
      ultimaRegla = "Eliminación de ε";
      simplificado = true;
      return filtered.length === 1 ? filtered[0] : { type: 'concat', nodes: filtered };
    }
    return node;
  }

  // --- PLUS (+) ---
  if (node.type === 'plus') {
    node.node = simplificarAST(node.node);
    if (simplificado) return node;
    if (node.node.type === 'union') {
      let parts = flattenUnion(node.node);
      if (parts.some(p => p.type === 'symbol' && p.value === '3')) {
        ultimaRegla = "(r ∪ ε)⁺ = r*";
        simplificado = true;
        return { type: 'star', node: node.node };
      }
    }
    if (node.node.type === 'star' || node.node.type === 'plus') {
      ultimaRegla = "Reducción de cerradura";
      simplificado = true;
      return node.node;
    }
    return node;
  }

  // --- STAR (*) ---
  if (node.type === 'star') {
    node.node = simplificarAST(node.node);
    if (simplificado) return node;
    if (node.node.type === 'union') {
      let parts = flattenUnion(node.node);
      if (parts.some(p => p.type === 'symbol' && p.value === '3') && parts.length > 1) {
        ultimaRegla = "(r ∪ ε)* = r*";
        simplificado = true;
        let resto = parts.filter(p => !(p.type === 'symbol' && p.value === '3'));
        return { type: 'star', node: resto.length === 1 ? resto[0] : resto.reduce((acc, curr) => ({ type: 'union', left: acc, right: curr })) };
      }
    }
    if (node.node.type === 'plus' || node.node.type === 'star') {
      ultimaRegla = "Reducción de cerradura";
      simplificado = true;
      return { type: 'star', node: node.node.node };
    }
    return node;
  }

  return node;
}

// =====================
// EXPORTACIÓN FINAL
// =====================
export function ejecutarSimplificacion(exp) {
  pasos = [];
  let expProcesada = exp.replace(/\s+/g, '').replace(/[U∪]/g, 'u').replace(/[ɛε]/g, '3').replace(/[+⁺]/g, '+');
  let ast = parse(expProcesada);
  let estadoActual = toString(ast);
  let cambio;

  do {
    simplificado = false;
    let nuevoAst = simplificarAST(ast);
    let nuevoEstado = toString(nuevoAst);
    cambio = estadoActual !== nuevoEstado;
    if (cambio) {
      registrar(ultimaRegla, nuevoEstado);
      ast = nuevoAst;
      estadoActual = nuevoEstado;
    }
  } while (cambio);

  return {
    original: exp.replace(/3/g, 'ε').replace(/\+/g, '⁺'),
    simplified: estadoActual.replace(/3/g, 'ε').replace(/\+/g, '⁺'),
    steps: pasos.map(p => ({
      theorem: p.regla,
      expression: p.resultado.replace(/3/g, 'ε').replace(/\+/g, '⁺')
    }))
  };
}