import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // The SOAP XML payload, you can also build this dynamically based on req.json() input
    const soapXml = `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <ns15:MessageHeader xmlns:ns15="http://www.ebxml.org/namespaces/messageHeader">
      <ns15:From><ns15:PartyId>99999</ns15:PartyId></ns15:From>
      <ns15:To><ns15:PartyId>123123</ns15:PartyId></ns15:To>
      <ns15:CPAId>AB</ns15:CPAId>
      <ns15:ConversationId>F73C09C20BBFF7DD731A99AD600BBB4F</ns15:ConversationId>
      <ns15:Service/>
      <ns15:Action>GetAncillaryOffersRQ</ns15:Action>
      <ns15:MessageData>
        <ns15:MessageId>mid:2015-03-24T15:06:51@sabre.com</ns15:MessageId>
        <ns15:Timestamp>2015-03-24T15:06:51</ns15:Timestamp>
      </ns15:MessageData>
    </ns15:MessageHeader>
    <ns17:Security xmlns:ns17="http://schemas.xmlsoap.org/ws/2002/12/secext">
      <ns17:BinarySecurityToken>Shared/IDL:IceSess/SessMgr:1.0.IDL/Common/!ICESMS/...</ns17:BinarySecurityToken>
    </ns17:Security>
  </soap:Header>
  <soap:Body>
    <ns9:GetAncillaryOffersRQ version="3.1.0" xmlns:ns9="http://services.sabre.com/merch/ancillary/offer/v03" ...>
      <!-- Your body content -->
    </ns9:GetAncillaryOffersRQ>
  </soap:Body>
</soap:Envelope>`;

    // Call the Sabre SOAP endpoint
    const response = await fetch(' https://webservices.platform.sabre.com/XY', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'SOAPAction': 'GetAncillaryOffersRQ', // Sometimes required
        // Add any auth headers your SOAP API needs
      },
      body: soapXml,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SOAP error:', errorText);
      return NextResponse.json({ error: 'Failed to fetch from SOAP service', details: errorText }, { status: 500 });
    }

    const responseText = await response.text();

    // You can parse the XML response here if you want or just return raw text
    return new NextResponse(responseText, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' }, // or application/json if you parse
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
