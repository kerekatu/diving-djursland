// @ts-nocheck
import I18nProvider from 'next-translate/I18nProvider'
import React from 'react'
import C, * as _rest from '../pages_'
import ns0 from '../locales/da/common.json'
import ns1 from '../locales/da/home.json'

const namespaces = { 'common': ns0, 'home': ns1 }

export default function Page(p){
  return (
    <I18nProvider 
      lang="da" 
      namespaces={namespaces}  
      internals={{"defaultLanguage":"da","isStaticMode":true}}
    >
      <C {...p} />
    </I18nProvider>
  )
}

Page = Object.assign(Page, { ...C })

if(C && C.getInitialProps) {
  Page.getInitialProps = ctx => C.getInitialProps({ ...ctx, lang: 'da'})
}


export const getStaticProps = ctx => _rest.getStaticProps({ ...ctx, lang: 'da' })





