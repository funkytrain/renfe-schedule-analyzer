// Transcripción del "Marco Regulador del Personal de Intervención Regionales" (3 de noviembre de 2003).
// Fuente: public/marco-regulador-intervencion-regionales.pdf
// Estructura: secciones -> bloques (subtítulo opcional) -> artículos { n, t }.

export const MARCO_TITULO = "Marco Regulador del Personal de Intervención Regionales";
export const MARCO_SUBTITULO =
  "Acta y Marco Regulador de la UN de Regionales (Cláusula 29ª del XIV Convenio Colectivo). Firmado el 3 de noviembre de 2003; en vigor desde el 1 de enero de 2004.";
export const MARCO_PDF_URL = "/marco-regulador-intervencion-regionales.pdf";

export const MARCO_CHIPS = [
  { label: "Merma", q: "merma" },
  { label: "Descanso", q: "descanso" },
  { label: "Toma y deje", q: "toma" },
  { label: "Reserva", q: "reserva" },
  { label: "Horas extraordinarias", q: "extraordinarias" },
  { label: "Mayor dedicación", q: "mayor dedicación" },
];

export const MARCO_SECCIONES = [
  {
    id: "acta",
    num: "",
    titulo: "Acta del 3 de noviembre de 2003",
    bloques: [
      {
        items: [
          {
            n: "",
            t: "En Madrid, a las 11:00 horas del día 3 de noviembre de 2003, se reúnen en las dependencias de la Dirección Corporativa de Organización y Recursos Humanos las personas que se indican en representación, respectivamente, de la Dirección de la Empresa y del Comité General de Empresa. De conformidad con lo dispuesto en la Cláusula 29ª del XIV Convenio Colectivo sobre «Marco Regulador del Personal de Intervención Regionales» y en base al proceso negociador que, en materia de funciones, condiciones de trabajo y sistema retributivo del colectivo de Intervención de la U.N. de Regionales, se ha llevado a cabo durante este período de tiempo, la Dirección de la Empresa y el Comité General de Empresa acuerdan:",
          },
          { n: "1", t: "Aprobar el documento que constituye el «Marco Regulador del Personal de Intervención Regionales», que se adjunta como único Anexo a este Acta." },
          { n: "2", t: "Con la firma del presente Marco Regulador, quedan superadas las Limitaciones Respecto del Agente de Acompañamiento, establecidas en el Acuerdo de 29-11-2002, de superación de moratoria de 1.993." },
          { n: "3", t: "La puesta en marcha del nuevo Marco de Intervención de Regionales no supondrá suplantación de funciones del personal de estaciones, ni afectará en forma alguna a sus condiciones de trabajo ni a su nivel de empleo." },
          {
            n: "4",
            t: "En el plazo de 1 año desde la entrada en vigor del presente Marco Regulador, la Comisión de Seguimiento establecida en su punto 4.2, analizará el impacto producido por la regulación en él contenida en las diferentes residencias de Regionales, introduciendo, en su caso, los ajustes pertinentes. Asimismo, el 31 de diciembre de 2004, en el caso de que la media de abono en concepto de traslaciones de todos los Interventores en Ruta que hayan tenido una prestación efectiva anual completa de gráficos de servicio de intervención de Regionales —exceptuando los correspondientes a los gráficos en los que se abone el complemento de trenes de alta calidad— se sitúe por debajo de 2542,28 € / año (en valores 2003), la Comisión de Seguimiento reajustará el sistema por el impacto que la nueva regulación hubiera producido.",
          },
          { n: "", t: "CGT manifiesta su desacuerdo con el documento tanto en materia de regulación de jornadas como en el valor asignado a la variable, al ser inferior ésta a lo pactado para las otras dos UN's." },
          { n: "", t: "El representante del SF manifiesta su desacuerdo, puesto que no recoge reivindicaciones importantes para el colectivo de intervención en ruta de la UN de Regionales y suponen un retroceso en condiciones laborales, de funciones y jornada. Reivindicaciones que han sido debidamente explicadas en el transcurso de la reunión." },
          { n: "", t: "Los representantes de UGT y CC.OO. consideran que el acuerdo alcanzado ha sido fruto de un amplio proceso de negociación en el que, si bien no se han cubierto todas las expectativas, se han recogido las aspiraciones fundamentales del colectivo de intervención de Regionales, tanto en materia de condiciones de trabajo como salariales." },
          { n: "", t: "Por último, conforme a lo establecido en la precitada Cláusula 29ª del XIV Convenio Colectivo, la Dirección de la Empresa y el Comité General de Empresa acuerdan que el citado Marco Regulador del Personal de Intervención Regionales forme parte integrante del contenido del XIV Convenio Colectivo, desde el mismo momento del acto de su firma." },
        ],
      },
    ],
  },
  {
    id: "0",
    num: "0",
    titulo: "Preámbulo",
    bloques: [
      {
        items: [
          { n: "", t: "En desarrollo de la cláusula 29 del XIV Convenio Colectivo, la representación de la Empresa y el Comité General de Empresa acuerdan las siguientes normas de funciones, jornada y sistema retributivo para la categoría de Interventor de la UN Regionales. El acuerdo de un nuevo marco regulador del colectivo de Intervención de la UN de Regionales implica:" },
          { n: "1", t: "No generar situaciones excedentarias dentro del colectivo de Intervención ni acciones de movilidad forzosa, como consecuencia de la aplicación de este Acuerdo." },
          { n: "2", t: "Ningún Interventor de la UN Regionales abandonará de manera forzosa el colectivo de Intervención de Regionales. Ambas partes acuerdan que las nuevas funciones aquí recogidas no implican modificación alguna en las condiciones psicofísicas requeridas hasta la actualidad para el desempeño de esta categoría profesional." },
        ],
      },
    ],
  },
  {
    id: "1",
    num: "1",
    titulo: "Funciones",
    bloques: [
      {
        items: [
          { n: "", t: "El presente Acuerdo establece las funciones que debe realizar el Interventor, aunque, obviamente no será necesario que hayan de efectuarse en todos los trenes, ya que cada tren presenta unas características determinadas que requieren tipos de actuaciones diferentes con el objetivo de realizar una prestación de servicio adecuada a la demanda de nuestros clientes." },
          { n: "", t: "El desempeño de las funciones del Interventor se llevará a cabo, indistintamente, en cualquiera de las modalidades siguientes: a bordo del tren y/o en tierra." },
          { n: "", t: "En el desempeño de las correspondientes funciones se emplearán, en su caso, las herramientas informáticas o de otro tipo que sean precisas, los medios de comunicación disponibles, como teléfono móvil, etc. y todas aquellas nuevas tecnologías de las que le dote la Empresa, sin que ello suponga un cambio en el contenido de dichas funciones ni en la adscripción del trabajador a otra categoría distinta, dado que la realización de las mismas es independiente de los medios que se utilicen." },
        ],
      },
      {
        sub: "Funciones relacionadas con la intervención",
        items: [
          { n: "1.1", t: "Al iniciar el servicio deberá presentarse con la antelación reglamentaria, con el objeto de justificar su presencia y recibir toda la información de cualquier eventualidad que afecte al tren o trenes que haya de atender (alteraciones en la composición, retrasos, enlaces, transbordos, etc.) recogiendo, en su caso, los listados de tiknet y la documentación precisa por los medios establecidos." },
          { n: "1.2", t: "Realizará la intervención según lo establecido en la Condiciones Generales de los Contratos de Transporte de Viajeros, Tarifas Especiales, Circulares y demás Normas e Instrucciones en vigor, que deberá poseer actualizadas en todo momento. Asimismo, controlará la identidad de todo el personal de servicio en el tren." },
          { n: "1.3", t: "Realizará el control de todos los títulos de transporte, sin excepción, tanto a pie de tren como en aquellos lugares que se determinen en cada momento. Establecerá y/o entregará, tanto a pie de tren como a lo largo del viaje, los títulos de transporte necesarios, con los medios que la Empresa le facilite. Realizará el control y gestión de las máquinas autoventa en las estaciones sin personal de venta de billetes o en los trenes que lleven este tipo de máquinas." },
          { n: "1.4", t: "Realizará la venta de títulos de transporte, con los medios que se doten, en trenes o estaciones. La venta, en las estaciones en las que hubiera personal de venta, será una actividad complementaria a la del personal de la propia estación y se efectuará, en este caso, cuando el cliente no pueda adquirir el título de transporte por falta de personal o avería de los puntos de venta, o en caso de excesiva afluencia de viajeros. Esta venta se podrá realizar en la estación y por el tiempo que se indique." },
          { n: "1.5", t: "Una vez superados los controles de acceso o a bordo del tren, en caso de falta de título de viaje o presentación de título insuficiente aplicará lo dispuesto en las normas o tarifas vigentes, recurriendo a la autoridad o al personal de seguridad cuando fuera necesario." },
        ],
      },
      {
        sub: "Funciones relacionadas con comercial",
        items: [
          { n: "1.6", t: "Se situará en lugar adecuado con la antelación que para cada caso se establezca, a fin de prestar ayuda u orientación a todos aquellos clientes que puedan necesitarla." },
          { n: "1.7", t: "Asesorará, informará y atenderá a los clientes en cuestiones relacionadas con el servicio y en otros asuntos que del mismo se deriven, procurando que en todo momento se alcancen los máximos niveles de calidad. Dispondrá de modelos de hojas de reclamaciones, según lo establecido en las normas e instrucciones al respecto." },
          { n: "1.8", t: "Realizará el manejo de la plataforma para personas con movilidad reducida en aquellos trenes que la lleven." },
          { n: "1.9", t: "Utilizará los diferentes sistemas de comunicación para dar información comercial a los viajeros. Si el tren está dotado de megafonía deberá llevar a acabo la salutación de bienvenida a los clientes mediante la grabación correspondiente, o en su defecto verbalmente, así como el aviso de llegada a las diferentes estaciones del recorrido y la despedida al aproximarse el tren a su destino, y cualquier otra comunicación necesaria. Si estas comunicaciones debieran realizarse por otra persona, vigilará el contenido y la puntualidad con que las mismas se realizan." },
          { n: "1.10", t: "Controlará los servicios a bordo realizados por personal externo a la UN Regionales y comprobará la adecuada calidad del servicio resolviendo cualquier incidencia sobre este particular que se produzca durante el recorrido del tren, bien personalmente o comunicando a la jefatura o centro responsable de la gestión que corresponda." },
          { n: "1.11", t: "Realizará la distribución y/o reparto de atenciones a los clientes tanto a pie de tren como a bordo. Estas prestaciones no incluirán las relativas a los productos que se venden a los clientes en la cafetería y en el servicio de restauración salvo incidencia grave." },
          { n: "1.12", t: "En caso de no disponer la composición del tren de botiquín, se le podrá dotar de una cartera botiquín para poner a disposición de los clientes que lo necesiten, con las instrucciones pertinentes para su utilización y reposición del material consumido, con arreglo a lo determinado por los Servicios Médicos." },
          { n: "1.13", t: "Se comunicará con la jefatura o centro responsable de la gestión que corresponda para recabar o facilitar información o instrucciones de la UN Regionales. Se pondrá especial empeño en que esta comunicación se produzca en caso de anomalía y se asegurará que las ayudas solicitadas durante el viaje por los clientes sean prestadas con eficacia, ya sea por propia iniciativa o recabando ayuda a quien corresponda en cada momento." },
          { n: "1.14", t: "Colaborará en los transbordos que pudieran producirse." },
          { n: "1.15", t: "Deberá cuidar esmeradamente su presencia personal, vistiendo el uniforme reglamentario y llevar en lugar visible la placa identificativa ante los clientes." },
          { n: "1.16", t: "Realizará, al inicio del viaje, un rápido recorrido por el tren con el fin de hacerse cargo de la situación y resolver los problemas de acomodación y de información que puedan presentarse." },
          { n: "1.17", t: "Colaborará en el transporte de documentos y pequeña paquetería de/ para la UN Regionales." },
          { n: "1.18", t: "Las actuaciones a realizar por el Interventor podrán estar reflejadas en los Manuales de Procedimiento o en cualquier otro tipo de comunicación, que no podrán contravenir, salvo pacto en contrario, la normativa laboral recogida en este Acuerdo." },
        ],
      },
      {
        sub: "Funciones relacionadas con prestación de servicios / atención a trenes",
        items: [
          { n: "1.19", t: "Realizará las tareas de control de acceso (check-in) a los trenes que se determinen." },
          { n: "1.20", t: "Verificará que la composición está correctamente formada y supervisará el correcto funcionamiento de las instalaciones y recursos relacionados con el confort, parámetros comerciales y de calidad, de acuerdo con las normas e instrucciones al respecto, elaborando las informaciones pertinentes, comunicando cualquier deficiencia o incidencia a la mayor celeridad posible, a la jefatura o centro responsable de la gestión que corresponda, y subsanando aquellas para las que se encuentre capacitado." },
          { n: "1.21", t: "Apoyará a otros interventores en la obtención de listados de ocupación, recogida de los billetes de tiknet o de otros elementos que sean necesarios para poder prestar servicio." },
          { n: "1.22", t: "Controlará y realizará las Campañas de Información y Venta, encuestas, cómputo y sondeo de viajeros, tanto a bordo del tren como en los lugares que se determinen, tales como congresos, exposiciones, ferias, empresas, colegios." },
        ],
      },
      {
        sub: "Funciones relacionadas con circulación",
        items: [
          { n: "1.23", t: "A bordo del tren se considerará Agente de Acompañamiento, asumiendo las funciones que se determinan en el Reglamento General de Circulación, según lo acordado en el Acuerdo para la superación de las limitaciones respecto del Agente de Acompañamiento de fecha 29-11-2002 y comunicará la finalización de las operaciones del tren cuando le sea requerido. En los trenes de material vacío que, a la ida o a la vuelta, hayan prestado o vayan a prestar servicio comercial se podrá considerar como Agente de Acompañamiento." },
          { n: "1.24", t: "Deberá poseer, debidamente actualizados, el Reglamento General de Circulación y las disposiciones normativas de Circulación vigentes destinadas a los trabajadores de su categoría, conociendo perfectamente su contenido según lo dispuesto en la normativa vigente y llevará a cabo las operaciones de circulación que reglamentariamente le correspondan." },
        ],
      },
      {
        sub: "Otras funciones",
        items: [
          { n: "1.25", t: "Podrá realizar funciones de organización, seguimiento, coordinación, control, etc. en aquellos centros responsables de la gestión que la UN Regionales designe." },
          { n: "1.26", t: "Realizará las tareas de carácter burocrático relacionadas con la contabilización de percepciones, control estadístico de clientes, informes de calidad y especiales, entrega de la recaudación, descarga de los datos de terminales informáticos de venta en ruta, etc., en la forma, los lugares, y con los documentos que se establezcan." },
          { n: "1.27", t: "Además, realizará cualquier función análoga a las anteriormente descritas relacionadas con el servicio propio de su categoría y atención al cliente, habiendo recibido la formación necesaria, tanto por propia iniciativa como cuando la Dirección lo demande." },
        ],
      },
    ],
  },
  {
    id: "2",
    num: "2",
    titulo: "Jornada",
    bloques: [
      {
        sub: "Gráficos",
        items: [
          { n: "2.1", t: "Los gráficos relativos a los Interventores se confeccionarán por la Dirección de la Empresa, oída la Representación de los Trabajadores, de conformidad con las normas establecidas en este Acuerdo, pudiendo ser impugnados por los Representantes de los Trabajadores en caso que estimen que se infringe lo dispuesto en estas normas." },
          { n: "2.2", t: "La distribución de las cargas de trabajo en cada gráfico será responsabilidad de la Dirección, y se hará de forma equitativa y que permita el mayor aprovechamiento y racionalización del servicio. Se podrán incluir un máximo de 25 horas por trabajador y mes, resultante de la suma de horas de mayor dedicación y de merma de descanso." },
          { n: "2.3", t: "Los desajustes temporales de personal podrán paliarse con intercambio de servicios entre las dependencias para mantener el equilibrio de la carga de trabajo." },
          { n: "2.4", t: "Podrán unificarse los distintos gráficos de varios centros de trabajo de la misma residencia." },
          { n: "2.5", t: "Los gráficos serán dados a conocer al personal afecto a los mismos con una antelación mínima de cinco días a su puesta en vigor. Si 72 horas antes de la fecha de entrada en funcionamiento prevista para el gráfico correspondiente, éste no ha sido aceptado por la Representación de los Trabajadores, entrará en vigor un gráfico de servicio con los turnos confeccionados por la Dirección de la Empresa conforme a las normas establecidas en el presente Acuerdo. La entrada en vigor de este gráfico no supondrá en modo alguno el cierre del período de consultas con la Representación de los Trabajadores, que proseguirá para intentar alcanzar acuerdo entre ambas partes. Se entregará a cada trabajador un ejemplar del gráfico." },
          { n: "2.6", t: "Los turnos en los distintos gráficos serán rotativos entre el personal de la residencia." },
          { n: "2.7", t: "Los viajes sin servicio se realizarán en trenes de viajeros o mediante el transporte que se determine para cada caso." },
          { n: "2.8", t: "En un mismo centro de trabajo podrán establecerse diferentes gráficos de servicio. Para los gráficos diferenciados, con la excepción de los correspondientes a los gráficos de trenes de Alta Calidad, será necesario el acuerdo con la Representación de los Trabajadores. La adscripción del personal de Intervención a un gráfico diferenciado, con los trenes que determine la Dirección de la Empresa, se realizará previo acuerdo de los criterios de selección con la Representación de los Trabajadores. De no conseguir acuerdo, la adscripción a un gráfico diferenciado se realizará mediante la superación de las pruebas correspondientes, cuya resolución se realizará de la siguiente forma: a) Tendrán preferencia para ocupar plazas los Interventores de la UN Regionales de la/s residencia/s del mismo municipio, que se hayan presentado y superen el nivel mínimo de aptitud fijado, para cada caso, por la UN Regionales. b) Podrán participar, con carácter subsidiario, los Interventores de otras residencias de la UN Regionales. Éstos podrán acceder al gráfico diferenciado de nueva creación en el supuesto de que superen el nivel mínimo de aptitud fijado, para cada caso, por la UN Regionales y siempre que no se cubran todas las plazas con el colectivo enumerado en el anterior apartado a)." },
          { n: "2.9", t: "Todos los días de trabajo del gráfico de servicio tendrán grafiada jornada efectiva y podrá incluir turnos para cubrir las incidencias (vacaciones, cursillos, IT, trenes especiales, refuerzos, etc.) que se produzcan. La jornada a realizar en los turnos de incidencias se nombrará como mínimo antes de la finalización del turno anterior de trabajo, en los gráficos pactados, y con una antelación mínima de 36 horas y siempre antes de la finalización del turno anterior en los gráficos no pactados. De no haber sido nombrado ningún servicio para el turno de incidencias se podrá realizar servicio de reserva, que podrá estar señalado en el gráfico." },
          { n: "2.10", t: "Se prohíbe la situación de disponible, con excepción de lo señalado para los turnos de incidencias." },
        ],
      },
      {
        sub: "Reservas y prestación de servicios / atención a trenes",
        items: [
          { n: "2.11", t: "La Dirección de la Empresa podrá incluir en los distintos gráficos el servicio de reserva que estime preciso para cubrir las necesidades e incidencias que se produzcan. La duración de la reserva será como mínimo de seis horas y podrá alcanzar hasta nueve por jornada." },
          { n: "2.12", t: "También podrá incluir la prestación de servicios/atención a trenes que estime necesarias. La duración de la prestación de servicios/atención a trenes será como máximo de nueve horas por jornada." },
          { n: "2.13", t: "Cuando la Dirección asigne durante el período de reserva funciones de prestación de servicios/atención a trenes, el tiempo total para que el interventor realice estas funciones no será superior al 50% del tiempo grafiado en el turno." },
          { n: "2.14", t: "Las dependencias estarán dotadas de los medios precisos para la prestación de la reserva lo más cómoda posible. Las reservas se efectuarán en la dependencia del trabajador." },
          { n: "2.15", t: "El trabajador que se encuentre en servicio de reserva o, subsidiariamente, el que realice prestación de servicios/atención a trenes deberá cubrir cualquier necesidad que se produzca; y asegurará, salvo disposición contraria, el servicio completo de ida y vuelta del trabajador a reemplazar. Si transcurridas 5 horas desde el comienzo del turno surgiera la necesidad de cubrir un servicio en tren y se prevea que el tiempo total de la jornada vaya a superar las 11 horas naturales, el Interventor deberá salir a efectos de actuar como Agente de Acompañamiento, por si fuere necesario durante el viaje, y llevará el teléfono móvil operativo." },
          { n: "2.16", t: "No podrá asignarse servicio de reserva cuando el comienzo o cese de la misma esté comprendido entre las veinticuatro y las seis horas." },
          { n: "2.17", t: "Ningún trabajador podrá volver a la situación de reserva después de un servicio que haya alcanzado siete horas de duración. Si no hubiera alcanzado siete horas, podrá reintegrarse a ella hasta finalizar el período previsto en el gráfico." },
          { n: "2.18", t: "El trabajador que, realizando prestación de servicios/atención a trenes, haya tenido que prestar un servicio por cualquier necesidad y/o incidencia que se haya producido podrá volver al turno si no lo ha finalizado." },
          { n: "2.19", t: "Cuando se preste servicio de reserva antes del descanso y haya que cubrir un servicio, dicho servicio no podrá obligar a dejar de disfrutar el descanso cíclico correspondiente." },
          { n: "2.20", t: "Se define como turno puro de prestación de servicios/atención a trenes aquél en el que la duración de la prestación de servicios/atención a trenes sea superior en un 50% al tiempo total grafiado en el turno. La prestación de servicios/atención a trenes se podrá realizar, también, fuera de la residencia del trabajador. Cuando este servicio se preste fuera de la residencia, en un turno puro, se realizará con más de un trabajador. En el resto de los casos la prestación de servicios/atención a trenes la podrá realizar un solo trabajador." },
        ],
      },
      {
        sub: "Duración de la jornada",
        items: [
          { n: "2.21", t: "La duración máxima de la jornada ordinaria será de nueve horas de trabajo efectivo al día, salvo en los turnos que comprendan, dentro de una misma jornada, el servicio de ida y regreso, bien al cruce o destino, con el tren inverso que le corresponda, o bien con otro tren que permita el ajuste del turno. En este caso se podrá ampliar la duración de la misma hasta rendir viaje en destino del tren o completar servicio de ida y regreso, a condición de que el viaje de ida no exceda de seis horas y no se realice un servicio anterior a la ida o posterior a la vuelta, sin que por esta causa se obligue al trabajador a realizar excesos sobre la jornada efectiva máxima legal cíclica." },
          { n: "2.22", t: "Los turnos establecidos, una vez iniciados, se podrán alterar cuando la Dirección lo determine, sin modificar su finalización en más de una hora sobre el horario previsto, salvo en casos de fuerza mayor que incidan en la seguridad o regularidad del servicio, en los que será por el tiempo necesario para rendir viaje en el lugar de destino asignado en el turno." },
          { n: "2.23", t: "Cuando por retraso en las circulaciones, accidentes u otras causas, no imputables a los trabajadores, pierdan éstos su turno, se reincorporarán cuanto antes al mismo." },
          { n: "2.24", t: "Se considerará trabajo efectivo el tiempo que media desde que los trabajadores se hacen cargo de su servicio, más el período asignado para la toma del mismo, si lo tiene, hasta que cesen en el servicio, más el tiempo grafiado para el deje del mismo, si lo tiene, y los intervalos inferiores a noventa minutos, que transcurran entre dos servicios consecutivos de trabajo efectivo." },
          { n: "2.25", t: "La situación de espera es la que se produce desde quince minutos antes de la hora oficial de salida del tren en que el trabajador haya de salir sin servicio para prestarlo. El tiempo que media desde el deje de un servicio hasta la salida del primer tren que deba utilizar para el regreso a su residencia y el tiempo que transcurra entre el deje de un servicio y la toma del siguiente, dentro de la misma jornada." },
          { n: "2.26", t: "Las esperas no se computarán como trabajo efectivo, si bien, su duración será tenida en cuenta para su influencia en el cálculo del tiempo de mayor dedicación y mermas de descanso que pudieran ocasionar." },
          { n: "2.27", t: "Si en una jornada hubiera más de una situación de espera, viaje sin servicio o de ambas a la vez, serán computadas como trabajo efectivo todas las situaciones, excepto aquella que tenga mayor duración." },
          { n: "2.28", t: "Se establece un máximo de seis horas de viaje sin servicio/ciclo de trabajo, considerándose, exclusivamente para el cómputo cíclico de la jornada, el 50% de las mismas como jornada efectiva, no tomándose esta disposición en consideración, en ningún caso, a los efectos del cómputo diario de jornada efectiva realizada." },
          { n: "2.29", t: "El descanso diario grafiado entre el deje de un servicio y la toma del siguiente, será de catorce horas en la residencia y de nueve fuera de ella, como mínimo." },
          { n: "2.30", t: "Tendrán consideración de horas extraordinarias el exceso que se realice sobre la duración de la jornada máxima legalmente establecida para cada ciclo." },
          { n: "2.31", t: "Tendrán consideración de horas de mayor dedicación el exceso de nueve horas naturales, dentro de la misma jornada." },
          { n: "2.32", t: "Tendrán consideración de horas de merma de descanso aquellas que supongan una reducción del tiempo de descanso, diario o cíclico, establecido entre el deje de un servicio y la toma del siguiente." },
          { n: "2.33", t: "Sin perjuicio de las compensaciones que correspondan por el tiempo de merma del descanso diario, se considerará finalizada la jornada si tal descanso llega a alcanzar el mínimo de diez horas en la residencia y seis fuera de ella." },
          { n: "2.34", t: "Podrán grafiarse, una vez por ciclo, descansos mínimos de diez horas en la residencia o seis fuera de ella cuando sea preciso para el ajuste de gráficos, procurando que sea fuera de la residencia, a condición de que se respeten en conjunto los mínimos de descanso diario del ciclo." },
          { n: "2.35", t: "El tiempo de toma y deje del servicio se establece en quince minutos para cada concepto. En el servicio de reserva, prestación de servicios/atención a trenes y en los viajes sin servicio no se aplicarán tiempos de toma y deje. Los tiempos de toma y deje se podrán aumentar para efectuar funciones relacionadas con el servicio propio de su categoría." },
          { n: "2.36", t: "La jornada de trabajo efectivo para este personal, en el ciclo normal de siete días, será la legalmente establecida para la jornada efectiva semanal, y se realizará normalmente, en ciclos de cinco días de trabajo y dos de descanso." },
          { n: "2.37", t: "Los períodos fraccionarios de menos de siete días que puedan quedar según la duración de los servicios, o cuando el número de agentes comprendidos en gráfico no sea múltiplo de siete, formarán un ciclo reducido, en el cual uno de los días será siempre de descanso." },
          { n: "2.38", t: "Si el número de días del gráfico establecido resultara múltiplo de siete, uno de los ciclos de siete días deberá desdoblarse en dos ciclos reducidos que en conjunto no represente un múltiplo de siete." },
          { n: "2.39", t: "No se iniciará, en ningún gráfico, más de una jornada de trabajo por día natural en la residencia del trabajador." },
          { n: "2.40", t: "El número de jornadas del ciclo no será superior al de días de trabajo del mismo." },
          {
            n: "2.41",
            t: "La duración de la jornada cíclica será la siguiente:",
            tabla: [
              ["Ciclo de 5 días de trabajo y 2 descansos", "40 horas"],
              ["Ciclo de 4 días de trabajo y 2 descansos", "32 horas"],
              ["Ciclo de 3 días de trabajo y 2 descansos", "24 horas"],
              ["Ciclo de 2 días de trabajo y 2 descansos", "16 horas"],
              ["Ciclo de 1 día de trabajo y 2 descansos", "8 horas"],
              ["Ciclo de 3 días de trabajo y 1 descanso", "24 horas"],
              ["Ciclo de 2 días de trabajo y 1 descanso", "16 horas"],
              ["Ciclo de 1 día de trabajo y 1 descanso", "8 horas"],
            ],
          },
          { n: "2.42", t: "Los diferentes excesos de horas de dedicación y merma de descanso que se puedan producir se compensarán por tiempos equivalentes de descanso, a razón de un día por cada ocho horas acumuladas, siempre que se sobrepasen las 30 horas, resultante de la suma de horas de mayor dedicación y de merma de descanso por trabajador y mes. Las horas extraordinarias que se produzcan se compensarán directamente a razón de un día por cada ocho horas acumuladas. Se podrán sumar los excesos que se produzcan con el fin de acumular las horas necesarias para disfrutar los descansos compensatorios. La compensación por las citadas horas se disfrutará dentro de las catorce semanas siguientes a partir del cierre del mes en que se hayan contabilizado los excesos de las citadas horas y hayan alcanzado un total de ocho horas para un determinado interventor." },
          { n: "2.43", t: "Cuando no se disfrute el descanso cíclico, el trabajador tendrá derecho a un descanso alternativo." },
          { n: "2.44", t: "Se procurará compensar los diferentes excesos de jornada, así como los descansos trabajados, como norma general, junto a los descansos de un ciclo." },
          { n: "2.45", t: "Cada interventor disfrutará 108 descansos anuales, entre los que se incluyen la compensación a todos los efectos de 14 fiestas laborales anuales, y se encuentran excluidos el período vacacional y los días de licencia por asuntos propios sin justificar, siempre que no tengan períodos no computables por incapacidad temporal, licencia sin sueldo, etc., en cuyo caso, de los 108 descansos anuales, se reducirá la parte correspondiente a éstos, de acuerdo con la siguiente fórmula: ND = {(DT x 94) / 330} + festivos correspondientes, siendo: ND = Número de días de descanso correspondientes al año natural. DT = (330 − número de días en que ha permanecido suspendida la relación laboral). Si al aplicar esta fórmula se obtiene un resultado con decimales se redondeará, por exceso o por defecto, al número entero más próximo. El tratamiento de las fiestas será individualizado, considerándose la fiesta correspondiente como compensada si el período de IT coincide con algún día festivo del calendario laboral." },
          { n: "2.46", t: "Los descansos compensatorios de las catorce fiestas laborales anuales se grafiarán junto con el/los descanso/s cíclico/s y/o en un período conjunto. Al finalizar el ejercicio correspondiente se realizará el cómputo personalizado de los descansos anuales disfrutados por el trabajador, aplicando la fórmula señalada en el punto anterior si fuera necesario. De producirse exceso de descansos anuales sobre los correspondientes a disfrutar por el trabajador, se amortizarán a cargo de la acumulación de horas de mayor dedicación, merma de descanso o extraordinarias que se hayan producido; dicha amortización se producirá en el ejercicio siguiente. De producirse defecto de descansos anuales sobre los correspondientes a disfrutar por el trabajador, se regularizarán en el ejercicio siguiente." },
          { n: "2.47", t: "La Empresa podrá facilitar también los descansos compensatorios, de excesos de jornada, mayor dedicación y merma de descanso, en aquellos días que resulten sin aprovechamiento efectivo, cuando en un turno que comprenda más de una fecha de trabajo, el interventor solicite un día de licencia de cualquier tipo en alguna de ellas; con la única limitación de que mediante este procedimiento no se compensarán más de siete descansos compensatorios por Interventor y año." },
          { n: "2.48", t: "En cada ciclo normal de siete días, los descansos diarios alcanzarán un mínimo de sesenta horas, de las que cuarenta y dos estarán comprendidas dentro de la propia residencia." },
          { n: "2.49", t: "En los ciclos normales de siete días, el descanso semanal, incluyendo el último descanso diario, comprenderá, como mínimo, sesenta y dos horas continuadas desde la finalización de la última jornada hasta la iniciación de la primera del ciclo siguiente, sin que tenga que coincidir obligatoriamente con dos días naturales." },
          { n: "2.50", t: "El descanso de ciclo reducido, unido al último descanso diario, comprenderá, como mínimo, treinta y ocho horas desde la finalización de la última jornada hasta el inicio de la primera del ciclo siguiente." },
          { n: "2.51", t: "No procederá la compensación de ninguno de los días de descanso cuando, quedando mermados éstos por incidencias de la circulación, lleguen a alcanzar cuarenta y ocho horas continuadas en los ciclos normales o veinticuatro en los otros, en cuyo caso, las horas de merma de descanso diario hasta completar sesenta y dos en los ciclos normales y treinta y ocho en los reducidos, se compensará en la forma establecida." },
          { n: "2.52", t: "En el caso del ciclo normal, cuando por incidencias de la circulación, el descanso quedara reducido a menos de cuarenta y ocho horas y más de treinta y ocho, se entenderá que no se ha disfrutado el primer día de descanso. Si el descanso queda reducido a menos de treinta y ocho horas, se considerará el primer descanso no disfrutado, y el segundo, mermado. Si quedase reducido a menos de veinticuatro horas, no se habrá disfrutado ninguno de los dos descansos. La parte correspondiente de esta regla, será aplicada a los ciclos reducidos." },
          { n: "2.53", t: "Al personal de Intervención se le entregará un documento en el que se reflejarán situaciones tales como las horas de trabajo efectivo, horas de mayor dedicación, etc., que influyan en la determinación y valoración de sus compensaciones, de uso y conservación obligatoria para el trabajador." },
        ],
      },
    ],
  },
  {
    id: "3",
    num: "3",
    titulo: "Sistema retributivo",
    bloques: [
      {
        items: [
          { n: "", t: "El nuevo sistema retributivo del Interventor de Regionales contempla nuevos conceptos económicos: Complemento de Puesto de Interventor Regionales, Incentivo de Productividad, Prima de Intervención Regionales y Complemento de Trenes de Alta Calidad. Todos los valores reflejados en el presente sistema retributivo son valores 2003." },
          { n: "3.1", t: "COMPLEMENTO DE PUESTO. Los interventores que presten servicio efectivo en la UN Regionales percibirán un complemento de puesto de 4.281,12 euros anuales, distribuido en 12 abonos de carácter mensual. La percepción de este complemento de puesto conlleva la realización de hasta 350 horas de nocturnidad en cómputo anual, abonándose, exclusivamente, a partir de la hora 351. Este complemento de puesto conlleva la incompatibilidad de abonos retributivos amparados en las claves relacionadas en el punto 3.7 de este Acuerdo. Este complemento de puesto absorbe el incremento económico correspondiente al complemento personal (clave 230) de aquellos conceptos cuyo abono es incompatible con el nuevo sistema retributivo. Este concepto incluye la compensación, a todos los efectos, de las horas de mayor dedicación y merma de descanso incluidos en los límites señalados en los puntos 2.2 y 2.42 de este Acuerdo. Este concepto se abonará por la clave correspondiente." },
          { n: "3.2", t: "INCENTIVO DE PRODUCTIVIDAD. Los interventores que presten servicio efectivo en la UN Regionales percibirán un incentivo de productividad variable anual máximo de 1.502,53 euros. Su percepción real será en función del cumplimiento de los objetivos fijados que se relacionan con arreglo a los siguientes porcentajes: 40% Cumplimiento del objetivo de Ingresos de la UN Regionales. 40% Cumplimiento del objetivo de Viajeros de la UN Regionales. 10% Cumplimiento de objetivos de Ingresos de la Gerencia. 10% Cumplimiento de objetivos de Viajeros de la Gerencia. El abono de este concepto será trimestral, a cuenta del total a percibir y regularizándose mediante liquidación anual en el primer pago trimestral, una vez conocidos los porcentajes de objetivos alcanzados. Este concepto se abonará por la clave correspondiente." },
          { n: "3.3", t: "PRIMA DE INTERVENCIÓN REGIONALES. Los interventores que presten servicio efectivo en la UN Regionales percibirán esta prima por un importe anual máximo de 3.157,95 euros, distribuido en 12 abonos de carácter mensual. Esta prima garantiza la retribución equivalente a la percepción mínima mensual de la cuantía fijada en la tabla salarial 13 del XIV Convenio Colectivo valores mensuales 2003, así como la que regulan la Prima de garantía subsidiaria de los sistemas de producción. Esta prima conlleva la incompatibilidad de abono de la citada Prima de garantía subsidiaria de los sistemas de producción y de cualquier clave de prima, excepto la Prima de Recaudación. Este concepto de abonará por la clave correspondiente." },
          { n: "3.4", t: "TRASLACIONES. Los interventores de Regionales que presten servicio efectivo en gráficos de la UN Regionales, como compensación a los gastos derivados de su trabajo efectivo a bordo de los mismos, percibirán el abono de traslaciones con arreglo a las tablas salariales vigentes en este concepto que determine el Convenio Colectivo." },
          { n: "3.5", t: "PRIMA DE RECAUDACIÓN. Los interventores de Regionales seguirán percibiendo la prima de recaudación (clave 47), en el porcentaje fijado actualmente, en todos aquellos casos en que exista una percepción efectiva, independientemente del modo en que el cliente realice el abono de la misma. Además, en el caso de que el interventor gestione la entrega de billetes emitidos por Internet (TIKNET), percibirá el 2% del importe de las facturas por operaciones con tarjeta de crédito de las que haya recogido la firma del cliente. Del nominal de la factura por operaciones con tarjeta de crédito se descontará la cantidad correspondiente a tasas e impuestos antes de calcular el porcentaje." },
          { n: "3.6", t: "COMPLEMENTO DE TRENES DE ALTA CALIDAD. Se crea un Complemento de Trenes de Alta Calidad, que se abonará a los interventores que presten servicio en gráficos de trenes de altas prestaciones, que son aquellos servicios que se prestan con material de alta velocidad en un gráfico diferenciado, que forman parte de un servicio multifrecuencia en el que se prestan diversos servicios de atención al cliente y se les realiza el control de acceso (check-in) en las terminales de salida. Dicho complemento compensa la merma económica del Interventor en estos gráficos de altas prestaciones en los conceptos de recaudación y gastos de viaje. La merma que estos interventores puedan tener en concepto de recaudación, queda igualmente compensada con la percepción del 2% de los billetes de tiknet cuya entrega gestionen. El valor de este Complemento de Alta Calidad es de 126,29 euros/mes y para percibirlo, al menos en un 80% de las claves de trenes del gráfico de trabajo, se debe prestar servicio en trenes que tengan estas prestaciones. Este concepto de abonará por la clave correspondiente." },
          {
            n: "3.7",
            t: "CONCEPTOS RETRIBUTIVOS INCOMPATIBLES CON EL NUEVO SISTEMA RETRIBUTIVO:",
            tabla: [
              ["20", "Horas a prorrata"],
              ["21", "Horas extras por fuerza mayor"],
              ["22", "Horas extraordinarias de Conducción e Intervención"],
              ["24", "Horas extraordinarias"],
              ["48", "Prima rendimiento personal de Intervención"],
              ["110", "Compensación por festivo trabajado"],
              ["115", "Fiestas suprimidas"],
              ["118", "Repuestos lintema"],
              ["147", "Bolsa de vacaciones"],
              ["153", "Compensación descanso diario de 20 minutos trabajando"],
              ["180", "Compensación mayor dedicación (interventores)"],
              ["181", "Compensación merma de descanso (interventores)"],
              ["427", "Prima de asistencia"],
              ["430", "Garantía de los sistemas de primas de producción"],
              ["442", "Prima de cursillistas en formación"],
              ["443", "Prima período de vacaciones"],
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    num: "4",
    titulo: "Disposiciones finales",
    bloques: [
      {
        items: [
          { n: "4.1", t: "APLICACIÓN ECONÓMICA. Todos los conceptos económicos recogidos en este Acuerdo se percibirán tal como se indica en su lugar al efecto, entendiéndose que dichas conceptos corresponden al año natural trabajado, (con la inclusión de vacaciones y días de licencia por asuntos propios sin justificar), no teniendo en ningún caso aquella consideración, situaciones distintas a las anteriores por incapacidad temporal, licencia sin sueldo, suspensión de empleo y sueldo, asistencia a consultas médicas y otras ausencias al trabajo sin derecho a retribución, que mermarán en la parte proporcional a dichos conceptos." },
          { n: "4.2", t: "COMISIÓN DE SEGUIMIENTO. Se crea una Comisión de Seguimiento, formada por una representación de la Empresa y de los Sindicatos firmantes del Acuerdo, que se reunirá trimestralmente durante los dieciocho meses siguientes a la puesta en funcionamiento de este Marco Regulador." },
          { n: "4.3", t: "ENTRADA EN VIGOR. El nuevo Marco Regulador del Interventor de Regionales entrará en vigor el 1 de enero de 2004." },
        ],
      },
    ],
  },
  {
    id: "5",
    num: "5",
    titulo: "Disposición derogatoria",
    bloques: [
      {
        items: [
          { n: "", t: "Con la firma del presente acuerdo queda derogado el artículo 213 de la NL de Renfe, también quedan derogados y sin efecto todas aquellas disposiciones normativas y acuerdos alcanzados anteriormente, de cualquier ámbito, que regulen la jornada y condiciones de trabajo del Interventor de la UN de Regionales, siempre que contradigan lo aquí estipulado." },
        ],
      },
    ],
  },
];
